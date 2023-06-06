import { ethers } from "ethers";
import { getDeal } from "../../../services/getDeal";

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
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-sm">
            <div>
                <div className="text-4xl font-bold">Deal #{data.id} details</div>
                <div className="text-lg font-light mt-2 text-gray-600">Choose an arbitrer you trust to approve your deal.</div>
                <div className="mt-4 text-gray-900 rounded">If you are part of this Deal in any way log</div>
            </div>
            <div className="border border-gray-300 rounded p-5">
                <div>
                    {
                        titleItem.map((item, index) => (
                            <div className={`flex  items-end justify-between p-2  whitespace-nowrap ${index !== titleItem.length - 1 ? 'border-b border-gray-300' : ''}`}>
                                <div className="mr-10 text-sm font-medium  text-gray-900">{item[0]}</div><div title={item[1]} className="font-semibold  overflow-hidden text-ellipsis text-right">{item[1]}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Deal;