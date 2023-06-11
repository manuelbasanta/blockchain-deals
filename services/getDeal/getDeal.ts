import { ethers } from "ethers";
import { blockchainDealABI } from '../../contracts/blockchainDealABI.js';
import moment from "moment";
import { DEAL_ID_MAPPER, STATE_ID_MAPPER } from "./dealTypes";

export const getDeal = async (id) => {
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_SEPOLIA_ID);
    const contract = new ethers.Contract(process.env.sepoliaContractAddress, blockchainDealABI, alchemyProvider);
    try {
        const deal = await contract.getArbitrerDealById(id);
        const formatted = Object.keys(deal).map(key => {
            if(typeof deal[key] === 'bigint') {
             return deal[key].toString();
            }
            return deal[key];
         })

         return formatDealResponse(formatted);
    } catch(error) {
        console.log(error)
        return {};
    }   
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
        isExpired: moment(moment.unix(Number(expirationTime))).isBefore(moment()),
        value,
        state: STATE_ID_MAPPER[state]
    }
}
