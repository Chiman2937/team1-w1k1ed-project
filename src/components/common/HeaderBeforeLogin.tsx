import LogoImage from '@/assets/images/logo.svg';
import Link from 'next/link';
import Nav from './Nav';
import Dropdown from './Dropdown';

export default function HeaderBeforeLogin() {
  return (
    <div className='bg-grayscale-50'>
      <div
        className='mx-auto py-[25px] bg-grayscale-50 flex items-center justify-between
    max-w-[375px] px-[20px]
    md:max-w-[744px]
    lg:max-w-[1920px] lg:px-[80px]'
      >
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
            <button className='hidden md:inline text-grayscale-400 cursor-pointer'>로그인</button>
          </Link>

          <div className='inline md:hidden'>
            <Dropdown
              menuItems={[
                { label: '위키목록', href: '/wikilist' },
                { label: '자유게시판', href: '/boards' },
                { label: '알림', href: '/login' },
                { label: '마이페이지', href: '/login' },
                { label: '로그인', href: '/login' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
