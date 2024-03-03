/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const modifiedConfig = { ...config };
    modifiedConfig.watchOptions = { ...config.watchOptions };
    modifiedConfig.watchOptions.poll = 300;

    return modifiedConfig;
  },
};

console.log(nextConfig);

export default nextConfig;
