import { useEffect, useState } from "react";
import getblockChain from "./ether";
import Store from "./Store";
const PaymentprocessorCom =() =>{
    const [payment,setPayment] = useState(undefined);
    const [dai, setDai] = useState(undefined);
    const [metamaskCon, setMetaMaskCon] = useState(false)
    useEffect(()=>{
        const init = async () =>{
          const {provider,paymentProcessor, dai} = await getblockChain();
          setPayment(paymentProcessor);
          setDai(dai)  
        };
        init();
        if(window.ethereum){
            setMetaMaskCon(true)
        }
    },[])
    return(
        <div className ="cotainer">
            <div className ="col-sm-12">
                <h1>Blockchain Ecommerce Dapp</h1>
                {metamaskCon || <p>Install Meta Mask wallet</p>}
                {!metamaskCon || <Store paymentProcessor={payment} dai = {dai}/>} 
            </div>
        </div>
    )
}
export default PaymentprocessorCom;