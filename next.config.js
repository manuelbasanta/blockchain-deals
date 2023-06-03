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
        sepoliaContractAddress: '0x41809d151683c6e9d645b7b20636dbD3DEe71C6b',
    }
};
   
module.exports = nextConfig;