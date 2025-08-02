'use client';

import NotificationSwitch from '@/components/common/NotificationSwitch';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GoChevronRight as IconArrowRight } from 'react-icons/go';

const SettingPage = () => {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  function getDaysSince(dateString: string): number {
    const createdAt = new Date(dateString);
    const today = new Date();

    const timeDiff = today.getTime() - createdAt.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    if (!user) {
      router.replace('/login'); // 로그인 페이지 경로로 리다이렉션
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col items-center my-[100px] '>
      <Link href='/'>
        <Image
          src='/images/logo.svg'
          alt='로고'
          width={400}
          height={80}
          className='my-[60px] transition-all duration-700
          w-[335px] 
          md:w-[400px] '
        />
      </Link>
      <div className='text-sm text-grayscale-400 mb-10'>
        wikied와 함께 한 지 {getDaysSince(user.createdAt)}일 되었어요
      </div>
      <div
        className='font-pretendard text-grayscale-500
        w-[335px] md:w-[400px] mx-auto transition-all duration-700'
      >
        <div
          className='text-lg font-semibold 
            flex items-center justify-between'
        >
          <div>로그인 정보</div>
          <div className='text-primary-green-200'>{user.email}</div>
        </div>
        <hr className='my-5 border-t border-grayscale-300 w-auto' />
        <NotificationSwitch />
        <hr className='my-5 border-t border-grayscale-300 w-auto' />
        <div className='flex flex-col gap-5'>
          <Link
            href='/mypage'
            className='text-lg font-semibold 
            flex items-center justify-between'
          >
            위키 생성하기
            <IconArrowRight className='size-6 fill-grayscale-400' />
          </Link>
          <Link
            href='/passwordChangePage'
            className='text-lg font-semibold 
            flex items-center justify-between'
          >
            비밀번호 변경
            <IconArrowRight className='size-6 fill-grayscale-400' />
          </Link>
          <div
            onClick={logout}
            className='text-lg font-semibold 
            flex items-center justify-between cursor-pointer'
          >
            로그아웃
            <IconArrowRight className='size-6 fill-grayscale-400' />
          </div>
        </div>
        <hr className='my-5 border-t border-grayscale-300 w-auto' />
      </div>
    </div>
  );
};

export default SettingPage;
