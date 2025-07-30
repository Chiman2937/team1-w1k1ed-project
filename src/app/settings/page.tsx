'use client';

import NotificationSwitch from '@/components/common/NotificationSwitch';
import Image from 'next/image';
import Link from 'next/link';
import { GoChevronRight as IconArrowRight } from 'react-icons/go';

const SettingPage = () => {
  return (
    <div className='flex flex-col items-center my-[100px]'>
      <Link href='/'>
        <Image
          src='/images/logo.svg'
          alt='로고'
          width={400}
          height={80}
          className='my-[60px] 
          w-[335px] 
          md:w-[400px]'
        />
      </Link>

      <div className='font-pretendard w-[335px] md:w-[400px] mx-auto '>
        <NotificationSwitch />
        <hr
          className='my-5 border-t border-grayscale-300
          w-auto transition-all duration-700'
        />
        <div className='flex flex-col gap-5'>
          <a
            href='/passwordChangePage'
            className='text-lg font-semibold text-grayscale-500
            flex items-center justify-between'
          >
            비밀번호 변경
            <IconArrowRight className='size-5 fill-grayscale-400' />
          </a>
          <a
            className='text-lg font-semibold text-grayscale-500
            flex items-center justify-between'
          >
            로그아웃
            <IconArrowRight className='size-5 fill-grayscale-400' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
