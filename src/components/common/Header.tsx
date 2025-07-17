import LogoImage from '@/assets/images/logo.svg'; // 로컬 이미지 파일 임포트
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <div className='md:max-w-[744px] lg:max-w-[1200px] lg:px-[80px] mx-auto max-w-[375px] bg-white flex px-[20px] py-[25px] items-center justify-between'>
      <div className='flex items-center gap-[40px]'>
        <Link href='/'>
          <LogoImage alt='로고' width={107} height={30} className='h-8 w-auto' />
        </Link>

        <Nav />
      </div>
      <Link href='/login'>
        {' '}
        <button className='text-gray-400 cursor-pointer'>로그인</button>
      </Link>
    </div>
  );
}
