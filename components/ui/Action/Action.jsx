"use client";

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const selectAction = ({actions, address, arbitrer, beneficiary, creator}) => {
    switch (address) {
        case arbitrer:
            return actions.arbitrer;
        case creator:
            return actions.creator;
        case beneficiary:
            return actions.beneficiary;
        default:
            return actions.stranger;
    }
}

const Action = ({
    actions,
    arbitrer,
    creator,
    beneficiary
}) => {
    const { address } = useAccount();
    const router = useRouter();
    const action = selectAction({actions, beneficiary, creator, arbitrer, address});
    const { name, type, label, args, buttonLabel, warning, info } = action;
    console.log(info)
    const { data, write } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: name,
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                console.log(data);
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
            <div className="mt-4 mb-4 text-gray-900 rounded break-words">Available actions for <span className="font-bold">{address}</span>:</div>
            <div className="text-base">{label}</div>
            {warning && <div className="font-semibold text-red-600 px-2 py-1 border-l-2 border-dashed border-red-600">{warning}</div>}
            {info && <div className="font-semibold text-blue-600">{info}</div>}
            <Button type="primary" label={buttonLabel} loading={isLoading} onClick={() => write(args)}/>
        </div>
    )
}

export default Action;