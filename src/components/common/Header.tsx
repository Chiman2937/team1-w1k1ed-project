import LogoImage from '@/assets/images/logo.svg';
import Link from 'next/link';
import Nav from './Nav';
import Menu from '@/assets/images/type=menu.svg';

export default function Header() {
  return (
    <div className='md:max-w-[744px] lg:max-w-[1200px] lg:px-[80px] mx-auto max-w-[375px] bg-white flex px-[20px] py-[25px] items-center justify-between'>
      <div className='flex items-center gap-[40px]'>
        <Link href='/'>
          <LogoImage alt='로고' width={107} height={30} className='h-8 w-auto' />
        </Link>

        <div className='hidden md:block'>
          <Nav />
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/login'>
          <button className='hidden md:inline text-gray-400 cursor-pointer'>로그인</button>
        </Link>

        <button className='inline md:hidden'>
          <Menu className='w-6 h-6 text-gray-600' /> {/* 햄버거 아이콘 */}
        </button>
      </div>
    </div>
  );
}
