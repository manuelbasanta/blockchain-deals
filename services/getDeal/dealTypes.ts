export enum DEAL {
    TRUSTLESS = 'Trustless Deal',
    ARBITRER = 'Arbitrer Deal',
    TIMELOCKED = 'Time Locked Deal',
}

export enum STATE {
    PENDING_APPROVAL = 'Pending approval',
    COMPLETED = 'Completed',
    VALUE_CLAIMED = 'Value claimed',
    PENDING_BENEFICIARY_DEPOSIT = 'Pending beneficiary\'s deposit',
    CONFIRMED = 'Confirmed',
    CANCELLED_BY_CREATOR = 'Cancelled by creator'
}

export const DEAL_ID_MAPPER = {
    0: DEAL.TRUSTLESS,
    1: DEAL.ARBITRER,
    2: DEAL.TIMELOCKED
}

export const STATE_ID_MAPPER = {
    0: STATE.PENDING_APPROVAL,
    1: STATE.COMPLETED,
    2: STATE.VALUE_CLAIMED,
    3: STATE.PENDING_BENEFICIARY_DEPOSIT,
    4: STATE.CONFIRMED,
    5: STATE.CANCELLED_BY_CREATOR
}
