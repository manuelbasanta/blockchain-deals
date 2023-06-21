import { ethers } from "ethers";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import DataItem from "./DataItem";
import TimeDataItem from "./TimeDataItem";
import { getDeal } from "../../../services/getDeal/getDeal";
import Action from "../../ui/Action/Action";
import CopyButton from "../../ui/CopyButton/copyButton";
import { CHAIN_DATA } from "../../../services/getDeal/networkTypes";

async function getData(id, chain) {
    const data = await getDeal({id, chain});
    return data;
}

const TIME_ITEMS = new Set(['Creation date','Expiration date'])

const Deal = async ({ id, network = 11155111 }) => {
    const data = await getData(id, network);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const ethValue = ethers.formatEther(data['value']);
    const buyerDeposit = ethers.formatEther(data['buyerDeposit']);
    const sellerDeposit = ethers.formatEther(data['sellerDeposit']);
    const networkData = CHAIN_DATA[network];
    const titleItem = [
        ['ID', data['id']],
        ['Network', networkData.label],
        ['Value', `${ethValue} ${networkData.nativeCurrency}`],
        ['Buyer', data['buyer']],
        ['Seller', data['seller']],
        ['Seller\'s deposit', `${sellerDeposit} ${networkData.nativeCurrency}`],
        ['Buyers\'s deposit', `${buyerDeposit} ${networkData.nativeCurrency}`],
        ['State', data['state']],
    ]

    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-base">
            <div>
                <div className="text-4xl font-bold">Deal #{data['id']} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">{ data['dealType']}</div>
                <WalletProvider>
                    <div className="mt-3 max-w-sm">
                        <CopyButton label="Copy Deal link" stringToCopy={`/deal/${data['id']}?network=${network}`} useOrigin/>
                    </div>
                    <WalletConnectContainer message='If you take any part in this Deal connect your wallet to take action.'>
                        <Action chainData={networkData} seller={data['seller']} buyer={data['buyer']} actions={data['actions']} />
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm h-fit">
                {titleItem.map(item => {
                    return <DataItem isExpired={data['isExpired']} key={item[1]} item={item} />
                })}
                <TimeDataItem key={'Creation date'} item={['Creation date', data['creationTime']]} />
            </div>
        </div>
    );
}

export default Deal;