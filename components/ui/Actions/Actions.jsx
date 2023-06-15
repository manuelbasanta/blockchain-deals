"use client";

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import { STATE } from "../../../services/getDeal/dealTypes";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const Actions = ({
    dealId,
    arbitrer,
    creator,
    beneficiary,
    isExpired,
    state,
    beneficiaryDeposit = null,
}) => {
    const { address } = useAccount();
    const router = useRouter();

    const { data, write: writeApproveArbitrerDeal } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'approveArbitrerDeal',
    });

    const { data: claimData, write: writeClaimArbitrerExpired } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'claimArbitrerExpired',
    });

    const { data: confirmBeneficiaryData, write: writeConfirmBeneficiary } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'confirmBeneficiary',
    });


    const { data: completeTrustlessDealData, write: writeCompleteTrustless } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'completeTrustlessDeal',
    });

    const { data: unilateralCancelTrustlessDealData, write: writeUnilateralCancelTrustlessDeal } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'unilateralCancelTrustlessDeal',
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash || claimData?.hash || confirmBeneficiaryData?.hash || completeTrustlessDealData?.hash || unilateralCancelTrustlessDealData?.hash,
        onSettled(data, error) {
            if(!error) {
                console.log(data);
                router.refresh();
            }
        }
    })

    const unilateralCancelTrustlessDealAvailable = state === STATE.PENDING_BENEFICIARY_DEPOSIT && address === creator;
    const completeTrustlessDealAvailable = state === STATE.CONFIRMED && address === creator;
    const confirmBeneficiaryAvailable = state === STATE.PENDING_BENEFICIARY_DEPOSIT && address === beneficiary;
    const approveAvailable = arbitrer === address && state === STATE.PENDING_APPROVAL && !isExpired;
    const claimValueAvailable = creator === address && state !== STATE.COMPLETED && state !== STATE.VALUE_CLAIMED && isExpired;
    const noActionsAvailableCompleted = !unilateralCancelTrustlessDealAvailable && !completeTrustlessDealAvailable && !confirmBeneficiaryAvailable && !claimValueAvailable && !approveAvailable && state === STATE.COMPLETED;
    const noActionsAvailableCancelled = !unilateralCancelTrustlessDealAvailable && !completeTrustlessDealAvailable && !confirmBeneficiaryAvailable && !claimValueAvailable && !approveAvailable && state === STATE.CANCELLED_BY_CREATOR;
    const noActionsAvailableForAddress = !unilateralCancelTrustlessDealAvailable && !completeTrustlessDealAvailable && !confirmBeneficiaryAvailable && !claimValueAvailable && !approveAvailable && (state !== STATE.COMPLETED && state !== STATE.CANCELLED_BY_CREATOR);
    console.log(state)
    return (
        <div className="flex gap-3 flex-col">
            <div className="mt-4 mb-4 text-gray-900 rounded text-sm font-semibold">Available actions for this wallet address:</div>
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
            {
                confirmBeneficiaryAvailable && (
                    <Button type="primary" label="Confirm deposit" loading={isLoading} onClick={() => writeConfirmBeneficiary({
                        args: [dealId],
                        value: beneficiaryDeposit
                    })}/>
                )
            }
            {
                completeTrustlessDealAvailable && (
                    <Button type="primary" label="Complete Deal" loading={isLoading} onClick={() => writeCompleteTrustless({
                        args: [dealId]
                    })}/>
                )
            }
            {
                unilateralCancelTrustlessDealAvailable && (
                    <Button type="error" label="Cancel Deal" loading={isLoading} onClick={() => writeUnilateralCancelTrustlessDeal({
                        args: [dealId]
                    })}/>
                )
            }
            {
                noActionsAvailableCompleted && 
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm">This Deal is completed and there are no actions to be made.</div>
            }
            {
                noActionsAvailableCancelled && 
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm">This Deal was cancelled and there are no actions to be made.</div>
            }
            {
                noActionsAvailableForAddress && 
                    <div className="mt-4 mb-4 text-gray-900 rounded text-sm break-words">The address <span className="font-bold">{address}</span> has no actions available for this Deal. Switch to a different address if you have any part in the Deal.</div>
            }
        </div>
    )
}

export default Actions;