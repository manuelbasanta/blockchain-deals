import { ethers } from "ethers";
import { blockchainDealsABI } from '../../contracts/blockchainDealsABI.js';
import moment from "moment";
import { DEAL_ID_MAPPER, STATE_ID_MAPPER } from "./dealTypes";
import { getAvailableActions } from "./getAvailableActions";

export const getArbitrerDeal = async (id) => {
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_SEPOLIA_ID);
    const contract = new ethers.Contract(process.env.contractAddress, blockchainDealsABI, alchemyProvider);
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
        creator,
        beneficiary,
        creationTime,
        expirationTime,
        state
    ] = deal;
    return {
        dealType: DEAL_ID_MAPPER[dealType],
        id,
        creator,
        beneficiary,
        arbitrer,
        expirationTime: Number(expirationTime),
        creationTime:  Number(creationTime),
        isExpired: moment(moment.unix(Number(expirationTime))).isBefore(moment()),
        actions: getAvailableActions(STATE_ID_MAPPER[state], id, null, false),
        value,
        state: STATE_ID_MAPPER[state]
    }
}
