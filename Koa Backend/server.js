const Koa = require ('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../dapp_frontend/src/contracts/PaymentProcessor.json');
const {Payment} = require('./db');
const { showThrottleMessage } = require('@ethersproject/providers');

const app = new Koa();
const router = new Router();
const items ={
    '1' : {id: 1, url:'http://UrlToDownloadItem1'},
    '2' : {id: 2, url:'http://UrlToDownloadItem2'},
    '3' : {id: 3, url:'http://UrlToDownloadItem3'}

}
router.get('/api/getPaymentId/:itemId', async ctx =>{
    const paymentId = (Math.random()*1000).toFixed(0);
    await Payment.create({
        id:paymentId,
        itemId:ctx.params.itemId,
        paid: false
    })
    ctx.body ={paymentId};
});

router.get('/api/getItemUrl/:paymentid', async ctx=>{
    const payment = await Payment.findOne({id: ctx.params.payment});
    if(payment && payment.paid == true){
        url : items[payment.itemId].url
    }
    else{
        ctx.body={
            url:''
        }
    }

})
app
.use(cors())
.use(router.routes())
.use(router.allowedMethods());

app.listen(4000, ()=>{
    console.log('Sever is running at 4000');
});
const listenToEvents = () =>{
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
    const networkId = '5777';
    const PaymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    );
    PaymentProcessor.on('Payment Done', async (payer,amount,paymentId, data) =>{
        console.log(`from ${payer} amount ${amount} paymentid ${paymentId} date ${(new Date(date.toNumber()*1000)).toLocaleString()}`);
        const payment = await Payment.findOne({id: paymentId});
        if(payment) {
            payment.paid = true;
            await payment.save();
        }
    });
    
listenToEvents();

}



