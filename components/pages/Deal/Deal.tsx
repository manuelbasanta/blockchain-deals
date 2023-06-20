import { ethers } from "ethers";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import DataItem from "./DataItem";
import TimeDataItem from "./TimeDataItem";
import { getDeal } from "../../../services/getDeal/getDeal";
import Action from "../../ui/Action/Action";
import CopyButton from "../../ui/CopyButton/copyButton";

async function getData(id) {
    const data = await getDeal(id);
    return data;
}

const TIME_ITEMS = new Set(['Creation date','Expiration date'])

const Deal = async ({ id }) => {
    const data = await getData(id);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const ethValue = ethers.formatEther(data['value']);
    const buyerDeposit = ethers.formatEther(data['buyerDeposit']);
    const sellerDeposit = ethers.formatEther(data['sellerDeposit']);
    const titleItem = [
        ['ID', data['id']],
        ['Value', `${ethValue} ETH`],
        ['Buyer', data['buyer']],
        ['Seller', data['seller']],
        ['Seller\'s deposit', `${sellerDeposit} ETH`],
        ['Buyers\'s deposit', `${buyerDeposit} ETH`],
        ['State', data['state']],
    ]

    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-base">
            <div>
                <div className="text-4xl font-bold">Deal #{data['id']} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">{ data['dealType']}</div>
                <WalletProvider>
                    <div className="mt-3 max-w-sm">
                        <CopyButton label="Copy Deal link"  stringToCopy={`/deal/${data['id']}`} useOrigin/>
                    </div>
                    <WalletConnectContainer message='If you take any part in this Deal connect your wallet to take action.'>
                        <Action seller={data['seller']} buyer={data['buyer']} actions={data['actions']} />
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm h-fit">
                {titleItem.map((item, index) => {
                    return <DataItem isExpired={data['isExpired']} key={item[1]} item={item} />
                })}
                <TimeDataItem key={'Creation date'} item={['Creation date', data['creationTime']]} />
            </div>
        </div>
    );
}

export default Deal;