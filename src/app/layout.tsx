import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next'; // Next.js 13.3+
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Pretendard, nexonGothicBold, nexonGothicLight, nexonGothicRegular } from './font';
import { AuthProvider } from '@/context/AuthContext';
import AuthHeaderRenderer from '@/components/layout/AuthHeaderRenderer';
import { Suspense } from 'react';
import Animation from '@/components/common/Animation';
import { ToastRender } from 'cy-toast';

const vercelUrl = process.env.VERCEL_URL;
const nextOrigin = `https://${vercelUrl}`;

export const metadata: Metadata = {
  title: 'wikied',
  description: '위키를 직접 작성하고 공유해보세요',
  metadataBase: new URL(nextOrigin),
  openGraph: {
    title: 'wikied',
    description: '위키를 직접 작성하고 공유해보세요',
    url: nextOrigin,
    siteName: 'wikied',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `${nextOrigin}/images/image_opengraph_wide.png`,
        width: 1200,
        height: 630,
        alt: 'wikied 오픈 그래프 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'wikied',
    description: '위키를 직접 작성하고 공유해보세요',
    images: [`${nextOrigin}/images/image_opengraph_wide.png`],
  },
  keywords: ['위키', '소통', '프로필 작성', 'wikied'],
  authors: [{ name: '파트3 1팀', url: nextOrigin }],
  generator: 'Next.js',
  category: '웹 애플리케이션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`
        ${Pretendard.className}
        ${Pretendard.variable}
        ${nexonGothicBold.variable}
        ${nexonGothicLight.variable}
        ${nexonGothicRegular.variable}
        antialiased`}
      >
        <ToastRender />
        <Suspense fallback={<div>앱 로딩증</div>}>
          <AuthProvider>
            <Animation>
              <AuthHeaderRenderer />
              {children}
            </Animation>
          </AuthProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
