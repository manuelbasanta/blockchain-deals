"use client";

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { blockchainDealABI } from '../../../contracts/blockchainDealABI';
import { STATE } from "../../../services/getDeal/dealTypes";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const Actions = ({
    dealId,
    arbitrer,
    buyer,
    seller,
    state
}) => {
    const { address } = useAccount();
    const router = useRouter();

    const { data, write: writeApproveArbitrerDeal } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        functionName: 'approveArbitrerDeal',
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                console.log(data);
                //router.refresh();
            }
        }
    })

    return (
        <>
            <div className="mt-4 mb-4 text-gray-900 rounded">Available actions for this wallet address:</div>
            {
                (arbitrer === address && state === STATE.PENDING_APPROVAL) && 
                <Button type="primary" label="Approve" loading={isLoading} onClick={() => writeApproveArbitrerDeal({
                    args: [dealId]
                })}/>
            }
        </>
    )
}

export default Actions;