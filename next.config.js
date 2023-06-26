/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: '@import "styles/_variables.scss";',
    },
    reactStrictMode: true,
    env: {
        sepoliaContractAddress: '0x9E5C0D26A518903dbec3dc8905DeB9CC608a7199',
        mumbaiContractAddress: '0x18A31814F7FE5E0cB62BdC8788d36B90f2336755',
    }
};
   
module.exports = nextConfig;
