/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { bodySizeLimit: '8mb' } },
  async headers() {
    return [{ source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] }];
  }
};
export default nextConfig;
