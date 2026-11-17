import type { NextConfig } from 'next';

const config: NextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' }],
    }];
  },
};
export default config;
