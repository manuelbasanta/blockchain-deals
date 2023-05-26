/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `@import "styles/_variables.scss";`,
    },
};
   
module.exports = nextConfig;