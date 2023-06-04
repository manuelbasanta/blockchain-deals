import { ethers } from "ethers";
import abi from '../../../contracts/BlockchainDeal.json';
import moment from "moment";

// TODO: Map query result, replace BigInts

async function getData(id) {
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_SEPOLIA_ID);
    const contract = new ethers.Contract(process.env.sepoliaContractAddress, abi, alchemyProvider);
    const message = await contract.getArbitrerDealById(id);
    console.log(message)

    const formatted = Object.keys(message).map(key => {
       console.log(typeof message[key]);
       if(typeof message[key] === 'bigint') {
        return message[key].toString();
       }
       return message[key];
    })

    console.log(formatted)
    return message;
}

const Deal = async ({ address }) => {
    const data = await getData(address);
    console.log(data);
    const ethValue = ethers.formatEther(data.value);
    return (
        <div>
            <div>id: {Number(data.id)}</div>
            <div>dealType: {data.dealType}</div>
            <div>value: {ethValue} ETH</div>
            <div>Arbitrer: {data.arbitrer}</div>
            <div>Buyer: {data.buyer}</div>
            <div>Seller: {data.seller}</div>
            <div>creationTime: {moment.unix(Number(data.creationTime)).format("DD-MM-YYYY HH:mm:ss")}</div>
            <div>expirationTime: {moment.unix(Number(data.expirationTime)).format("DD-MM-YYYY HH:mm:ss")}</div>
            <div>state: {String(data.state)}</div>
        </div>
    );
}

export default Deal;