/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/photography",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
