/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react',
        };
        return config;
      }, 
};

export default nextConfig;
