import { STATE } from "./dealTypes";

export const getAvailableActions = ({state, id, sellerDeposit, buyerDeposit, isExpired, value}) => {
    const actions = createActions({id, sellerDeposit, value, buyerDeposit});
    return {
        buyer: getBuyerAction({actions, state, isExpired}),
        seller: getSellerAction({actions, state, isExpired}),
        arbitrer: getArbitrerAction({actions, state, isExpired}),
        stranger: actions.noActionsAvailableForAddress
    }
}

const getBuyerAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_SELLER_DEPOSIT:
            return actions.buyerCancelTrustlessDeal;
        case STATE.PENDING_BUYER_DEPOSIT:
            return actions.buyerConfirmTrustless;
        case STATE.CONFIRMED:
            return actions.completeTrustlessDeal; 
        case STATE.COMPLETED:
            return actions.noActionsAvailableCompleted;
        case STATE.CANCELLED_BY_CREATOR:
            return actions.noActionsAvailableCancelled;
        case STATE.VALUE_CLAIMED_EXPIRED:
            return actions.noActionsValueClaimed;
        case STATE.ARBITRER_PENDING_BUYER_CONFIRMATION:
            if(isExpired) return actions.noActionsExpired;
            return actions.confirmArbitrerDealByBuyer;
        case STATE.PENDING_ARBITRER_APPROVAL:
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
        case STATE.VALUE_CLAIMED_EXPIRED:
            return actions.noActionsValueClaimed;
        case STATE.ARBITRER_PENDING_BUYER_CONFIRMATION:
            if(isExpired) return actions.noActionsExpired;
            return actions.noActionsAvailableForAddress;
        case STATE.PENDING_ARBITRER_APPROVAL:
            if(isExpired) return actions.noActionsExpired;
            return actions.approveArbitrerDeal;
        default:
            return actions.noActionsAvailableForAddress;
    }
}

const getSellerAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_SELLER_DEPOSIT:
            return actions.sellerConfirmTrustless;
        case STATE.PENDING_BUYER_DEPOSIT:
            return actions.sellerCancelTrustlessDeal;
        case STATE.PENDING_ARBITRER_APPROVAL:
            if(isExpired) return actions.noActionsExpired;
            return actions.noActionsPendingApproval;
        case STATE.ARBITRER_PENDING_BUYER_CONFIRMATION:
            if(isExpired) return actions.noActionsExpired;
            return actions.cancelArbitrerDealAsSeller;
        case STATE.CONFIRMED:
            return actions.noActionsConfirmed; 
        case STATE.COMPLETED:
            return actions.noActionsAvailableCompleted;
        case STATE.CANCELLED_BY_CREATOR:
            return actions.noActionsAvailableCancelled;
        case STATE.VALUE_CLAIMED_EXPIRED:
            return actions.noActionsValueClaimed;
        default:
            return actions.noActionsAvailableForAddress;
    }
}

const createActions = ({id, sellerDeposit, value, buyerDeposit}) => ({
    approveArbitrerDeal: {
        type: 'action',
        name: 'approveArbitrerDeal',
        label: 'You\'ve been honored with the responsability of approving this Deal. If all conditions are met you can go ahead and approve it.',
        info: 'Once you approve it, the Deal will be completed and the value will go to the seller.',
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
    sellerConfirmTrustless: {
        type: 'action',
        name: 'sellerConfirmTrustless',
        label: 'The buyer of the Deal has submited the value and his or her deposit, now is your turn to confirm it. Take a good look at the Deal\'s information before submitting your deposit and confirming the Deal.',
        warning: 'The buyer of the Deal can cancel it for as long as you don\'t confirm it, after confirmation the buyer won\'t be able to cancel it.',
        buttonLabel: 'Confirm deposit',
        args: {
            args: [id],
            value: sellerDeposit
        }
    },
    completeTrustlessDeal: {
        type: 'action',
        name: 'completeTrustlessDeal',
        label: 'The Deal is confirmed, all deposits and value are ready. If you have received the goods/service this is the moment to complete the Deal.',
        info: 'You will get your deposit back and the seller will get his/her deposit plus the value of the Deal.',
        buttonLabel: 'Complete Deal',
        args: {
            args: [id]
        }
    },
    buyerCancelTrustlessDeal: {
        type: 'action',
        name: 'buyerCancelTrustlessDeal',
        label: 'The seller hasn\'t made the deposit yet, the Deal is not confirmed. You can cancel it before the seller\'s confirmation.',
        info: 'Copy the Deal link and send it to the seller so that he/she can confirm it!',
        buttonLabel: 'Cancel Deal',
        args: {
            args: [id]
        }
    },
    sellerCancelTrustlessDeal: {
        type: 'action',
        name: 'sellerCancelTrustlessDeal',
        label: 'The buyer hasn\'t made the deposit yet, the Deal is not confirmed. You can cancel it before the buyers\'s confirmation.',
        info: 'Copy the Deal link and send it to the buyer so that he/she can confirm it!',
        buttonLabel: 'Cancel Deal',
        args: {
            args: [id]
        }
    },
    confirmArbitrerDealByBuyer: {
        type: 'action',
        name: 'confirmArbitrerDealByBuyer',
        label: 'You need to pay the value of the Deal to confirm it. The arbitrer can then proceed to approve it',
        buttonLabel: 'Pay value & confirm Deal',
        args: {
            args: [id],
            value
        }
    },
    buyerConfirmTrustless: {
        type: 'action',
        name: 'buyerConfirmTrustless',
        label: 'You can now confirm the Deal by paying the value and the your (buyer\'s) deposit.',
        warning: 'Once you confirm the Deal it can\'t be cancelled. Double check the Deal details.',
        buttonLabel: 'Confirm Deal',
        args: {
            args: [id],
            value: String(Number(value) + Number(buyerDeposit))
        }
    },
    cancelArbitrerDealAsSeller: {
        type: 'action',
        name: 'cancelArbitrerDealAsSeller',
        label: 'The buyer hasn\'t confirmed the Deal yet, you can cacel it.',
        buttonLabel: 'Confirm Deal',
        args: {
            args: [id],
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
        label: 'You have confirmed the Deal and now it has to be completed by the buyer once he or she receives the goods/service.',
        info: 'Provide the agreed upon goods or services to the buyer so that he or she can Complete the Deal and you can get the value + the deposit.',
        type: 'empty',
        name: 'noActionsConfirmed'
    },
    noActionsPendingApproval: {
        label: 'You have to wait for the arbitrer to approve this Deal.',
        info: 'Let the arbitrer know the Deal is ready for approval! You can copy the linkand send it.',
        type: 'empty',
        name: 'noActionsPendingApproval'
    }
});
