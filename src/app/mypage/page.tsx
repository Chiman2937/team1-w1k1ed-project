'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useEffect, useState } from 'react';

export default function MyPage() {
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
        <form className='flex flex-col gap-[8px] mx-auto'>
          <Input
            label='비밀번호 변경'
            type='password'
            placeholder='기존 비밀번호'
            name='currentPassword'
            variant={isMdUp ? 'L' : 'S'}
          />
          <Input
            type='password'
            placeholder='새 비밀번호'
            name='newPassword'
            variant={isMdUp ? 'L' : 'S'}
          />
          <Input
            type='password'
            placeholder='새 비밀번호 확인'
            name='confirmNewPassword'
            variant={isMdUp ? 'L' : 'S'}
          />
          <div className='flex justify-end mt-[16px]'>
            <Button>변경하기</Button>
          </div>
          <hr className='my-[32px] border-t border-grayscale-200' />
        </form>
        <form className='flex flex-col gap-[8px] mx-auto'>
          <Input
            label='위키 생성하기'
            type='text'
            placeholder='질문을 입력해 주세요'
            name='question'
            variant={isMdUp ? 'L' : 'S'}
          />
          <Input
            type='text'
            placeholder='답을 입력해 주세요'
            name='answer'
            variant={isMdUp ? 'L' : 'S'}
          />
          <div className='flex justify-end mt-[16px]'>
            <Button>생성하기</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
