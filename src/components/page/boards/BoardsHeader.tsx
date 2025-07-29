'use client';

import Button from '@/components/common/Button';
import SnackBar from '@/components/common/Snackbar';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BoardsHeader() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/addboard');
    } else {
      setShowToast(true);
      setIsOpening(true);

      // 닫힘 애니메이션 타이밍
      setTimeout(() => {
        setIsOpening(false);
        setIsClosing(true);
      }, 1000);

      // 로그인 화면 전환을 약간 늦춤
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  };

  return (
    <section className='w-full flex justify-between py-10 items-center relative'>
      <h1 className='text-grayscale-500 text-2xl-semibold'>베스트 게시글</h1>
      <Button onClick={handleClick} className='btn'>
        게시물 등록하기
      </Button>

      {showToast && (
        <SnackBar variant='info' isOpening={isOpening} isClosing={isClosing} index={0}>
          로그인이 필요한 서비스입니다.
        </SnackBar>
      )}
    </section>
  );
}
