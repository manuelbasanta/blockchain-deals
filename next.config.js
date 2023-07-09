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
        sepoliaContractAddress: '0xF4EE701737EFAEd6B1fc2A0D09b3830A5b5c8878',
        mumbaiContractAddress: '0x7235a7Ebce5dDf88EBabc49500910c7a4A752Be4',
    }
};
   
module.exports = nextConfig;
