import { ethers } from "ethers";
import { blockchainDealsABI } from '../../contracts/blockchainDealsABI.js';
import { STATE_ID_MAPPER } from "./dealTypes";
import { getAvailableActions } from "./getAvailableActions";

export const getDeal = async (id) => {
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_SEPOLIA_ID);
    const contract = new ethers.Contract(process.env.contractAddress, blockchainDealsABI, alchemyProvider);

    try {
        const deal = await contract.getDealById(id);
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
        buyer,
        seller,
        creator,
        value,
        buyerDeposit,
        sellerDeposit,
        creationTime,
        state
    ] = deal;
    return {
        id,
        buyer,
        creator,
        seller,
        sellerDeposit,
        buyerDeposit,
        creationTime:  Number(creationTime),
        isExpired: false,
        value,
        actions: getAvailableActions({state: STATE_ID_MAPPER[state], id, sellerDeposit, isExpired: false, value, buyerDeposit}),
        state: STATE_ID_MAPPER[state]
    }
}
