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

const Deal = async ({ id, network = 11155111 }) => {
    const data = await getData(id, network);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const ethValue = ethers.formatEther(data['value']);
    const buyerDeposit = ethers.formatEther(data['buyerDeposit']);
    const sellerDeposit = ethers.formatEther(data['sellerDeposit']);
    const networkData = CHAIN_DATA[network];

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
                <DataItem label="ID" data={data['id']} />
                <DataItem label="Network" data={networkData.label} />
                <DataItem label="Value" data={`${ethValue} ${networkData.nativeCurrency}`} icon={`/icons/${networkData.icon}`} />
                <DataItem label="Buyer" data={data['buyer']} />
                <DataItem label="Seller" data={data['seller']} />
                <DataItem label="Seller's deposit" data={`${sellerDeposit} ${networkData.nativeCurrency}`} />
                <DataItem label="Buyers's deposit" data={`${buyerDeposit} ${networkData.nativeCurrency}`} />
                <TimeDataItem label="Creation date" data={data['creationTime']} />
                <DataItem label="State" data={data['state']} lastItem />
            </div>
        </div>
    );
}

export default Deal;