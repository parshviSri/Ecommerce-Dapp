import { ethers, Contract} from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

const getblockChain = () =>{
    return new Promise((resolve, reject) =>{
        window.addEventListener('load', async ()=>{
            if(window.ethereum){
                await window.ethereum.enable();
                const networkId = '5777';
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const paymentProcessor = new Contract(
                    PaymentProcessor.networks[networkId].address,
                    PaymentProcessor.abi,
                    signer
                );
                const dai = new Contract(
                    Dai.networks[networkId].address,
                    Dai.abi,
                    signer
                );
                resolve({provider, paymentProcessor,dai});
                // resolve({provider: undefined, paymentProcessor:undefined, dai:undefined});

            }
        });
    })
}
export default getblockChain;
