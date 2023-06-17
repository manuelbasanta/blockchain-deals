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
        sepoliaContractAddress: '0xEF22B89CF972aACbbBD3c48f577Ca1a107Bd8aed',
        hardhatContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        contractAddress: '0x0b97b3BCCdd79e46D5994300B68A6961FB3209fD'
    }
};
   
module.exports = nextConfig;