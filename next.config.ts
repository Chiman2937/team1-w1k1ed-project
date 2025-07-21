// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '', // 포트가 없다면 빈 문자열
        pathname: '/Wikied/user/**', // 또는 /Wikied/**, /Wikied/user/1429/** 등 더 구체적으로 지정 가능
      },
      // },
    ],
  },
};

export default nextConfig;
