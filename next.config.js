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
        contractAddress: '0x4d0efa5fadd6D898436322b548fFE282AB0EfeBa'
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
   
module.exports = nextConfig;