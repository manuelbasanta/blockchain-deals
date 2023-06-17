export enum DEAL {
    TRUSTLESS = 'Trustless Deal',
    ARBITRER = 'Arbitrer Deal'
}

export enum STATE {
    PENDING_ARBITRER_APPROVAL = 'Pending arbitrer approval',
    ARBITRER_PENDING_BUYER_CONFIRMATION = 'Pending buyer confirmation',
    COMPLETED = 'Completed',
    VALUE_CLAIMED_EXPIRED = 'Value claimed',
    PENDING_SELLER_DEPOSIT = 'Pending seller\'s deposit',
    PENDING_BUYER_DEPOSIT = 'Pending buyer\'s deposit',
    CONFIRMED = 'Confirmed',
    CANCELLED_BY_CREATOR = 'Cancelled by creator'
}

export const DEAL_ID_MAPPER = {
    0: DEAL.TRUSTLESS,
    1: DEAL.ARBITRER
}

export const STATE_ID_MAPPER = {
    0: STATE.PENDING_ARBITRER_APPROVAL,
    1: STATE.ARBITRER_PENDING_BUYER_CONFIRMATION,
    2: STATE.VALUE_CLAIMED_EXPIRED,
    3: STATE.PENDING_SELLER_DEPOSIT,
    4: STATE.PENDING_BUYER_DEPOSIT,
    5: STATE.CONFIRMED,
    6: STATE.CANCELLED_BY_CREATOR,
    7: STATE.COMPLETED
}
