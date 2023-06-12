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
    isExpired,
    state
}) => {
    const { address } = useAccount();
    const router = useRouter();

    const { data, write: writeApproveArbitrerDeal } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        functionName: 'approveArbitrerDeal',
    });

    const { data: claimData, write: writeClaimArbitrerExpired } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        functionName: 'claimArbitrerExpired',
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash || claimData?.hash,
        onSettled(data, error) {
            if(!error) {
                console.log(data);
                router.refresh();
            }
        }
    })

    const approveAvailable = arbitrer === address && state === STATE.PENDING_APPROVAL && !isExpired;
    const claimValueAvailable = buyer === address && state !== STATE.COMPLETED && state !== STATE.VALUE_CLAIMED && isExpired;
    const noActionsAvailableCompleted = !claimValueAvailable && !approveAvailable && state === STATE.COMPLETED;
    const noActionsAvailableForAddress = !claimValueAvailable && !approveAvailable && state !== STATE.COMPLETED;

    return (
        <>
            {
                (approveAvailable || claimValueAvailable) && 
                <>
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm">Available actions for this wallet address:</div>
                    {
                        approveAvailable && (
                            <Button type="primary" label="Approve" loading={isLoading} onClick={() => writeApproveArbitrerDeal({
                                args: [dealId]
                            })}/>
                        )
                    }
                    {
                        claimValueAvailable && (
                            <Button type="primary" label="Claim value" loading={isLoading} onClick={() => writeClaimArbitrerExpired({
                                args: [dealId]
                            })}/>
                        )
                    }
                </>
            }
            {
                noActionsAvailableCompleted && 
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm">This Deal is completed and there are no actions to be made.</div>
            }
            {
                noActionsAvailableForAddress && 
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm break-words">The address <span className="font-bold">{address}</span> has no actions available for this Deal. Switch to a different address if you have any part in the Deal.</div>
            }
        </>
    )
}

export default Actions;