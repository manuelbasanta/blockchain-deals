import { ethers } from "ethers";
import { getDeal } from "../../../services/getDeal/getDeal";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import Actions from "../../ui/Actions/Actions";
import DataItem from "./DataItem";

async function getData(id) {
    const data = await getDeal(id);
    return data;
}

const Deal = async ({ id }) => {
    const data = await getData(id);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const {id: dealId, dealType, value, arbitrer, buyer, seller, creationTime, expirationTime, state, isExpired} = data;
    const ethValue = ethers.formatEther(value);
    const titleItem = [
        ['ID', dealId],
        ['Deal type:', dealType],
        ['Value', `${ethValue} ETH`],
        ['Arbitrer', arbitrer],
        ['Buyer', buyer],
        ['Seller', seller],
        ['Creation date', creationTime],
        ['Expiration date', expirationTime],
        ['State', state],
    ]

    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-md">
            <div>
                <div className="text-4xl font-bold">Deal #{data.id} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">{dealType}</div>
                <WalletProvider>
                    <WalletConnectContainer message='If you take any part in this Deal connect your wallet to take action.'>
                        <Actions isExpired={isExpired} dealId={dealId} arbitrer={arbitrer} buyer={buyer} seller={seller} state={state}/>
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm">
                {titleItem.map((item, index) => <DataItem isExpired={isExpired} key={item[1]} item={item} lastItem={index === titleItem.length - 1}/>)}
            </div>
        </div>
    );
}

export default Deal;