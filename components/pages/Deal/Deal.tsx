import { ethers } from "ethers";
import { getDeal } from "../../../services/getDeal/getDeal";
import WalletProvider from "../../providers/WalletProvider/WalletProvider";
import WalletConnectContainer from "../../ui/WalletConnectContainer/WalletConnectContainer";
import Actions from "../../ui/Actions/Actions";

async function getData(id) {
    const data = await getDeal(id);
    return data;
}

const Deal = async ({ id }) => {
    const data = await getData(id);
    const {id: dealId, dealType, value, arbitrer, buyer, seller, creationTime, expirationTime, state} = data;
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
                        <Actions dealId={dealId} arbitrer={arbitrer} buyer={arbitrer} seller={seller} state={state}/>
                    </WalletConnectContainer>
                </WalletProvider>
            </div>
            <div className="border border-gray-300 rounded p-5 text-sm">
                <div>
                    {
                        titleItem.map((item, index) => (
                            <div className={`flex  items-end justify-between p-2 whitespace-nowrap ${index !== titleItem.length - 1 ? 'border-b border-gray-300' : ''}`}>
                                <div className="mr-10 font-medium  text-gray-900">{item[0]}</div><div title={item[1]} className="font-semibold  overflow-hidden text-ellipsis text-right">{item[1]}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Deal;