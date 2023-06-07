export enum DEAL {
    TRUSTLESS = 'Trustless Deal',
    ARBITRER = 'Arbitrer Deal',
    TIMELOCKED = 'Time Locked Deal',
}

export enum STATE {
    PENDING_APPROVAL = 'Pending approval',
    COMPLETED = 'Completed'
}

export const DEAL_ID_MAPPER = {
    0: DEAL.TRUSTLESS,
    1: DEAL.ARBITRER,
    2: DEAL.TIMELOCKED
}

export const STATE_ID_MAPPER = {
    0: STATE.PENDING_APPROVAL,
    1: STATE.COMPLETED
}