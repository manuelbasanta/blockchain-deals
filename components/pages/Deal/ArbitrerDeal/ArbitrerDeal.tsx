import { ethers } from "ethers";
import { getArbitrerDeal } from "../../../../services/getDeal/getArbitrerDeal";
import WalletProvider from "../../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../../ui/WalletConnectContainer/WalletConnectContainer";
import DataItem from "../DataItem";
import TimeDataItem from "../TimeDataItem";
import Action from "../../../ui/Action/Action";

async function getData(id) {
    const data = await getArbitrerDeal(id);
    return data;
}

const TIME_ITEMS = new Set(['Creation date','Expiration date'])

const Deal = async ({ id }) => {
    const data = await getData(id);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const ethValue = ethers.formatEther(data['value']);

    const titleItem = [
        ['ID', data['id']],
        ['Deal type:', data['dealType']],
        ['Value', `${ethValue} ETH`],
        ['Arbitrer', data['arbitrer']],
        ['Seller', data['seller']],
        ['Creator', data['buyer']],
        ['Creation date', data['creationTime']],
        ['Expiration date', data['expirationTime']],
        ['State', data['state']],
    ]

    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-base">
            <div>
                <div className="text-4xl font-bold">Deal #{data['id']} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">{ data['dealType']}</div>
                <WalletProvider>
                    <WalletConnectContainer message='If you take any part in this Deal connect your wallet to take action.'>
                        <Action arbitrer={data['arbitrer']} seller={data['seller']} buyer={data['buyer']} actions={data['actions']}/>
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm">
                {titleItem.map((item, index) => {
                    if(TIME_ITEMS.has(item[0])) return <TimeDataItem key={item[1]} item={item} lastItem={index === titleItem.length - 1}/>
                    return <DataItem isExpired={data['isExpired']} key={item[1]} item={item} lastItem={index === titleItem.length - 1}/>
                })}
            </div>
        </div>
    );
}

export default Deal;