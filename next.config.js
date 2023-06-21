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
        sepoliaContractAddress: '0xE35E7d9a4b8e01869ca2789dA9f7feB1457C8Ee4',
        hardhatContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        mumbaiContractAddress: '0xE0917DCEb4BbCB45D37a33449D28A43c6DD26C14',
    }
};
   
module.exports = nextConfig;