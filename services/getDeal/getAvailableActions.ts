import { STATE } from "./dealTypes";

export const getAvailableActions = (state, id, beneficiaryDeposit, isExpired) => {
    const actions = createActions({id, beneficiaryDeposit});
    return {
        creator: getCreatorAction({actions, state, isExpired}),
        beneficiary: getBeneficiaryAction({actions, state, isExpired}),
        arbitrer: getArbitrerAction({actions, state, isExpired}),
        stranger: actions.noActionsAvailableForAddress
    }
}

const getCreatorAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_BENEFICIARY_DEPOSIT:
            return actions.unilateralCancelTrustlessDeal;
        case STATE.CONFIRMED:
            return actions.completeTrustlessDeal; 
        case STATE.COMPLETED:
            return actions.noActionsAvailableCompleted;
        case STATE.CANCELLED_BY_CREATOR:
            return actions.noActionsAvailableCancelled;
        case STATE.PENDING_APPROVAL:
            if(isExpired) return actions.claimArbitrerExpired;
            return actions.noActionsPendingApproval;
        default:
            return actions.noActionsAvailableForAddress;
    }
}

const getArbitrerAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.COMPLETED:
            return actions.noActionsAvailableCompleted;
        case STATE.VALUE_CLAIMED:
            return actions.noActionsValueClaimed;
        case STATE.PENDING_APPROVAL:
            if(isExpired) return actions.noActionsExpired;
            return actions.approveArbitrerDeal;
        default:
            return actions.noActionsAvailableForAddress;
    }
}

const getBeneficiaryAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_BENEFICIARY_DEPOSIT:
            return actions.confirmBeneficiary;
        case STATE.PENDING_APPROVAL:
            if(isExpired) return actions.noActionsExpired;
            return actions.noActionsPendingApproval;
        case STATE.CONFIRMED:
            return actions.noActionsConfirmed; 
        case STATE.COMPLETED:
            return actions.noActionsAvailableCompleted;
        case STATE.CANCELLED_BY_CREATOR:
            return actions.noActionsAvailableCancelled;
        default:
            return actions.noActionsAvailableForAddress;
    }
}



const createActions = ({id, beneficiaryDeposit}) => ({
    approveArbitrerDeal: {
        type: 'action',
        name: 'approveArbitrerDeal',
        label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit',
        buttonLabel: 'Approve',
        args: {
            args: [id]
        }  
    },
    claimArbitrerExpired: {
        type: 'action',
        name: 'claimArbitrerExpired',
        label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit',
        buttonLabel: 'Calim value',
        args: {
            args: [id]
        }
    },
    confirmBeneficiary: {
        type: 'action',
        name: 'confirmBeneficiary',
        label: 'The creator of the Deal has submited the value and his or her deposit, now is your turn to confirm it. Take a good look at the Deal\'s information before submitting your deposit and confirming the Deal.',
        warning: 'The creator of the Deal can cancel it for as long as you don\'t confirm it, after that he won\'t be able to.',
        buttonLabel: 'Confirm deposit',
        args: {
            args: [id],
            value: beneficiaryDeposit
        }
    },
    completeTrustlessDeal: {
        type: 'action',
        name: 'completeTrustlessDeal',
        label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit',
        buttonLabel: 'Complete Deal',
        args: {
            args: [id]
        }
    },
    unilateralCancelTrustlessDeal: {
        type: 'action',
        name: 'unilateralCancelTrustlessDeal',
        label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit',
        buttonLabel: 'Cancel Deal',
        args: {
            args: [id]
        }
    },
    noActionsAvailableCompleted: {
        label: 'This Deal is completed and there are no actions to be taken.',
        type: 'empty',
        name: 'noActionsAvailableCompleted'
    },
    noActionsAvailableCancelled: {
        label: 'This Deal was cancelled and there are no actions to be taken.',
        type: 'empty',
        name: 'noActionsAvailableCancelled'
    },
    noActionsAvailableForAddress: {
        label: 'This address has no actions available for this Deal. Switch to a different address if you have any part in the Deal.',
        type: 'empty',
        name: 'noActionsAvailableForAddress'
    },
    noActionsValueClaimed: {
        label: 'The value of this Deal was already claimed, there are no actions to be taken.',
        type: 'empty',
        name: 'noActionsValueClaimed'
    },
    noActionsExpired: {
        label: 'The Deal has expired and there are no actions to be taken.',
        type: 'empty',
        name: 'noActionsExpired'
    },
    noActionsConfirmed: {
        label: 'You have confirmed the Deal and now it has to be completed by the creator once he or she recieves his or her goods/service.',
        type: 'empty',
        name: 'noActionsExpired'
    },
    noActionsPendingApproval: {
        label: 'You have to wait for the arbitrer to approve this Deal.',
        info: 'Let the arbitrer know the Deal is ready for approval!',
        type: 'empty',
        name: 'noActionsExpired'
    }
});
