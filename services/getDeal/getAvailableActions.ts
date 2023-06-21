import { STATE } from "./dealTypes";

export const getAvailableActions = ({state, id, sellerDeposit, buyerDeposit, isExpired, value}) => {
    const actions = createActions({id, sellerDeposit, value, buyerDeposit});
    return {
        buyer: getBuyerAction({actions, state, isExpired}),
        seller: getSellerAction({actions, state, isExpired}),
        stranger: actions.noActionsAvailableForAddress
    }
}

const getBuyerAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_SELLER_DEPOSIT:
            return actions.buyerCancelDeal;
        case STATE.PENDING_BUYER_DEPOSIT:
            return actions.buyerConfirmDeal;
        case STATE.CONFIRMED:
            return actions.completeDeal; 
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

const getSellerAction = ({actions, state, isExpired}) => {
    switch(state) {
        case STATE.PENDING_SELLER_DEPOSIT:
            return actions.sellerConfirmDeal;
        case STATE.PENDING_BUYER_DEPOSIT:
            return actions.sellerCancelDeal;
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
    sellerConfirmDeal: {
        type: 'action',
        name: 'sellerConfirmDeal',
        label: 'The buyer of the Deal has submited the value and his or her deposit, now is your turn to confirm it. Take a good look at the Deal\'s information before submitting your deposit and confirming the Deal.',
        warning: 'The buyer of the Deal can cancel it for as long as you don\'t confirm it, after confirmation the buyer won\'t be able to cancel it.',
        buttonLabel: 'Confirm deposit',
        args: {
            args: [id],
            value: sellerDeposit
        }
    },
    completeDeal: {
        type: 'action',
        name: 'completeDeal',
        label: 'The Deal is confirmed, all deposits and value are ready. If you have received the goods/service this is the moment to complete the Deal.',
        info: 'You will get your deposit back and the seller will get his/her deposit plus the value of the Deal.',
        buttonLabel: 'Complete Deal',
        args: {
            args: [id]
        }
    },
    buyerCancelDeal: {
        type: 'action',
        name: 'buyerCancelDeal',
        label: 'The seller hasn\'t made the deposit yet, the Deal is not confirmed. You can cancel it before the seller\'s confirmation.',
        info: 'Copy the Deal link and send it to the seller so that he/she can confirm it!',
        buttonLabel: 'Cancel Deal',
        args: {
            args: [id]
        }
    },
    sellerCancelDeal: {
        type: 'action',
        name: 'sellerCancelDeal',
        label: 'The buyer hasn\'t made the deposit yet, the Deal is not confirmed. You can cancel it before the buyers\'s confirmation.',
        info: 'Copy the Deal link and send it to the buyer so that he/she can confirm it!',
        buttonLabel: 'Cancel Deal',
        args: {
            args: [id]
        }
    },
    buyerConfirmDeal: {
        type: 'action',
        name: 'buyerConfirmDeal',
        label: 'You can now confirm the Deal by paying the value and the your (buyer\'s) deposit.',
        warning: 'Once you confirm the Deal it can\'t be cancelled. Double check the Deal details.',
        buttonLabel: 'Confirm Deal',
        args: {
            args: [id],
            value: String(Number(value) + Number(buyerDeposit))
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
    }
});
