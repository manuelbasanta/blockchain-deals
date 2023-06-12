import { ethers } from "ethers";
import { getDeal } from "../../../services/getDeal/getDeal";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import Actions from "../../ui/Actions/Actions";
import DataItem from "./DataItem";
import moment from "moment";

async function getData(id) {
    const data = await getDeal(id);
    return data;
}

const Deal = async ({ id }) => {
    const data = await getData(id);
    if(Object.keys(data).length === 0) return <div>Deal not found</div>
    const ethValue = ethers.formatEther(data['value']);
    const expirationTime = moment.unix(Number(data['expirationTime'])).format('DD/MM/YYYY HH:mm:ss');
    const creationTime = moment.unix(Number(data['creationTime'])).format('DD/MM/YYYY HH:mm:ss');

    const titleItem = [
        ['ID', data['id']],
        ['Deal type:', data['dealType']],
        ['Value', `${ethValue} ETH`],
        ['Arbitrer', data['arbitrer']],
        ['Buyer', data['buyer']],
        ['Seller', data['seller']],
        ['Creation date', expirationTime],
        ['Expiration date', creationTime],
        ['State', data['state']],
    ]

    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-md">
            <div>
                <div className="text-4xl font-bold">Deal #{data['id']} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">{ data['dealType']}</div>
                <WalletProvider>
                    <WalletConnectContainer message='If you take any part in this Deal connect your wallet to take action.'>
                        <Actions isExpired={data['isExpired']} dealId={data['id']} arbitrer={data['arbitrer']} buyer={data['buyer']} seller={data['seller']} state={data['state']}/>
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm">
                {titleItem.map((item, index) => <DataItem isExpired={data['isExpired']} key={item[1]} item={item} lastItem={index === titleItem.length - 1}/>)}
            </div>
        </div>
    );
}

export default Deal;