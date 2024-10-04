/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Mengatur redirect menjadi sementara (302)
      },
    ];
  },
}

module.exports = nextConfig;
