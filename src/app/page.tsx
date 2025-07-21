'use client';

import HeroSection from '@/components/common/HeroSection';
import ShareSection from '@/components/common/ShareSection';
import ViewSection from '@/components/common/ViewSection';
import CTASection from '@/components/common/CTASection';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShareSection />
      <ViewSection />
      <CTASection />
      <Footer />
    </>
  );
}
