import { ethers } from "ethers";
import axios from "axios";
const API_URL= 'http://localhost:4000';
const ITEMS= [
    {
        id: 1,
        ethPrice : ethers.utils.parseEther('1'),
        price:10
    },
    {
        id: 2,
        ethPrice : ethers.utils.parseEther('2'),
        price: 20
    }
];
const Store = (props) =>{
    const buyHandler = async(element) =>{
        console.log(element.ethPrice);
        const paymentId = await axios.get(`${API_URL}/api/getPaymentId/${element.id}`);
        const tx1 = await props.dai.approve(props.paymentProcessor.address, element.ethPrice);
        await tx1.wait();
        const tx2 = await props.paymentProcessor.pay(element.ethPrice,paymentId.data.paymentId);
        await tx2.wait();
        console.log('tx2',tx2);
        const downloadUrl = await axios.get(`${API_URL}/api/getItemUrl/${paymentId.data.paymentId}`);
        console.log(downloadUrl);


    }
    return(
        <ul className="list-group" >
            {ITEMS.map((element)=>{
                return(
                    
                        <li className= "list-group-item" key={element.id}>
                            <span>Buy item {element.id} </span>
                            <span className="font-weight-bold">DAI {element.price}</span>
                            <button className= "btn btn-primary float-right"
                            onClick={()=>buyHandler(element)} value={{id:element.id, ethPrice:element.ethPrice}}>Buy Now</button>
                        </li>
                )
            })}
        </ul>
    )
}
export default Store;