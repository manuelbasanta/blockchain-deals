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
        alchemyId: process.env.ALCHEMY_ID,
        walletConnectId: process.env.WALLET_CONNECT_ID,
    }
};
   
module.exports = nextConfig;