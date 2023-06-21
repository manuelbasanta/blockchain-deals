import { ethers } from "ethers";
import { blockchainDealsABI } from '../../contracts/blockchainDealsABI.js';
import { STATE_ID_MAPPER } from "./dealTypes";
import { getAvailableActions } from "./getAvailableActions";
import { CHAIN_DATA } from "./networkTypes";

export const getDeal = async ({id, chain = 11155111}) => {
    const chainData = CHAIN_DATA[chain];
    if(!chainData) return {};
    const { alchemy_label, alchemy_id, contract_address } = chainData;
    const alchemyProvider = new ethers.AlchemyProvider(alchemy_label, alchemy_id);
    const contract = new ethers.Contract(contract_address, blockchainDealsABI, alchemyProvider);

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
