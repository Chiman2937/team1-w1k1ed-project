'use client';

import PasswordChangeForm from '@/components/common/PasswordChangeForm';
import WikiCreateForm from '@/components/common/WikiCreateForm';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className='font-pretendard'>
      <div className='flex flex-col gap-[64px] mt-[141px]'>
        <h1 className='font-semibold text-center text-[24px]'>계정 설정</h1>
        <PasswordChangeForm isMdUp={isMdUp} />
        <WikiCreateForm isMdUp={isMdUp} />
      </div>
    </div>
  );
};

export default MyPage;
