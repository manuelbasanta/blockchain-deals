"use client";

import { useAccount, useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const selectAction = ({actions, address, seller, buyer}) => {
    switch (address) {
        case buyer:
            return actions.buyer;
        case seller:
            return actions.seller;
        default:
            return actions.stranger;
    }
}

const Action = ({
    actions,
    buyer,
    seller,
    chainData,
}) => {
    const { address } = useAccount();
    const router = useRouter();
    const { chain } = useNetwork();

    const [error, setError] = useState(null);
    const action = selectAction({actions, seller, buyer, address});
    const { name, type, label, args, buttonLabel, warning, info } = action;


    const { data, write , isLoading: isLoadingWrite, isSuccess } = useContractWrite({
        address: chainData.contract_address,
        abi: blockchainDealsABI,
        functionName: name,
        chainId: chainData.id,
        onError(error) {
            setError(error.cause.shortMessage);
        }, 
    });

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                router.refresh();
            }
        }
    })

    if(type === 'empty') {
        return (
            <div className="break-words mt-2 max-w-sm text-sm">
                <div className="mt-4 mb-4 text-gray-900 max-w-sm break-words">Address: <span className="font-bold">{address}</span></div>
                <div className="mt-4 mb-4 text-gray-900 break-words text-base">{label}</div>
                {info && <div className="w-fit font-semibold text-blue-600 px-2 py-0 border-l-2 border-dashed border-blue-600">{info}</div>}
            </div>
        );
    }


    return (
        <div className="flex gap-3 flex-col max-w-sm text-sm">
            {chainData.id !== chain.id ? (
                <div className="text-red-700 rounded p-2 bg-red-100 text-sm border border-red-700 mt-5">
                    <div className="font-semibold mb-2">Change network</div>
                    This is a <span className="font-semibold">{chainData.label}</span> Deal and you are currently connected to <span className="font-semibold">{chain.name}</span>. Switch to <span className="font-semibold">{chainData.label}</span> to take action.
                </div>
                ) : (
                    <>
                    <div className="mt-4 mb-4 text-gray-900 rounded break-words">Available actions for <span className="font-bold">{address}</span>:</div>
                    <div className="text-base mb-4">{label}</div>
                    {warning && <div className="font-semibold text-red-600 mb-4 px-2 py-1 border-l-2 border-dashed border-red-600">{warning}</div>}
                    {info && <div className="w-fit font-semibold text-blue-600 mb-4 px-2 py-0 border-l-2 border-dashed border-blue-600">{info}</div>}
                    <Button type="primary" label={buttonLabel} loading={isLoading} onClick={() => write(args)}/>
                    {(error && !isLoadingWrite && !isSuccess) && <div className="text-red-700 rounded p-2 bg-red-100 font-semibold text-sm border border-red-700">{error}</div>}
                </>
                )
            }
        </div>
    )
}

export default Action;