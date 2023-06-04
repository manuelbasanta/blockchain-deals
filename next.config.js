/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: '@import "styles/_variables.scss";',
    },
    reactStrictMode: true,
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    env: {
        alchemySepoliaId: process.env.ALCHEMY_SEPOLIA_ID,
        alchemyMainnetId: process.env.ALCHEMY_MAINNET_ID,
        walletConnectId: process.env.WALLET_CONNECT_ID,
        hardhatContractAddress: process.env.HARDHAT_CONTRACT_ADDRESS,
        sepoliaContractAddress: '0xABE34AF24BB9F00F19a8abafee12eEa4aDa5EEd8',
        hardhatContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    }
};
   
module.exports = nextConfig;