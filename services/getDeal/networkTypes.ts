export enum CHAIN_LABELS {
    SEPOLIA = 'Sepolia',
    MUMBAI = 'Polygon Mumbai',
}

export const CHAIN_DATA = {
    80001: {
        id: 80001,
        label: CHAIN_LABELS.MUMBAI,
        alchemy_label: 'matic-mumbai',
        alchemy_id: process.env.ALCHEMY_MUMBAI_ID,
        contract_address: process.env.mumbaiContractAddress,
        nativeCurrency: 'MATIC',
        icon: 'mumbai.svg'
    },
    11155111: {
        id: 11155111,
        label: CHAIN_LABELS.SEPOLIA,
        alchemy_label: 'sepolia',
        alchemy_id: process.env.ALCHEMY_SEPOLIA_ID,
        contract_address: process.env.sepoliaContractAddress,
        nativeCurrency: 'SEP',
        icon: 'ethereum.svg'
    }
};


export const NETWORK_SELECTOR_ITEMS = [
    {
        label: CHAIN_LABELS.SEPOLIA,
        value: 11155111
    },
    {
        label: CHAIN_LABELS.MUMBAI,
        value: 80001
    },
];