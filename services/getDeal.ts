import { ethers } from "ethers";
import abi from '..//contracts/BlockchainDeal.json';
import moment from "moment";

export const getDeal = async (id) => {
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_SEPOLIA_ID);
    const contract = new ethers.Contract(process.env.sepoliaContractAddress, abi, alchemyProvider);
    const deal = await contract.getArbitrerDealById(id);

    const formatted = Object.keys(deal).map(key => {
       if(typeof deal[key] === 'bigint') {
        return deal[key].toString();
       }
       return deal[key];
    })

    return formatDealResponse(formatted);
}

const DEAL_ID_MAPPER = {
    0: 'Trustless Deal',
    1: 'Arbitrer Deal',
    2: 'Time Locked Deal'
}

const STATE_ID_MAPPER = {
    0: 'Pending approval',
    1: 'Completed',
}

const formatDealResponse = deal => {
    const [
        id,
        dealType,
        value,
        arbitrer,
        buyer,
        seller,
        creationTime,
        expirationTime,
        state
    ] = deal;
    return {
        dealType: DEAL_ID_MAPPER[dealType],
        id,
        buyer,
        seller,
        arbitrer,
        expirationTime: moment.unix(Number(expirationTime)).format('DD/MM/YYYY HH:mm:ss'),
        creationTime:  moment.unix(Number(creationTime)).format('DD/MM/YYYY HH:mm:ss'),
        value,
        state: STATE_ID_MAPPER[state]
    }
}
