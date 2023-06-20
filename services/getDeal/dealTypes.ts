export enum STATE {
    COMPLETED = 'Completed',
    VALUE_CLAIMED_EXPIRED = 'Value claimed',
    PENDING_SELLER_DEPOSIT = 'Pending seller\'s deposit',
    PENDING_BUYER_DEPOSIT = 'Pending buyer\'s deposit',
    CONFIRMED = 'Confirmed',
    CANCELLED_BY_CREATOR = 'Cancelled by creator'
}

export const STATE_ID_MAPPER = {
    0: STATE.PENDING_SELLER_DEPOSIT,
    1: STATE.PENDING_BUYER_DEPOSIT,
    2: STATE.CONFIRMED,
    3: STATE.CANCELLED_BY_CREATOR,
    4: STATE.COMPLETED,
}
