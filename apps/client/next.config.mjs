/** @type {import('next').NextConfig} */
export default {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3333', // Adjust the port if necessary
          pathname: '/user/profile/**',
        },
      ],
    },
  };
  