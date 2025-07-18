import LogoImage from '@/assets/images/logo.svg';
import Link from 'next/link';
import Nav from './Nav';
import { FaBell } from 'react-icons/fa';
import Dropdown from './Dropdown';

export default function HeaderAfterLogin() {
  return (
    <div className='bg-grayscale-50'>
      <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
        <div className=' mx-auto py-[25px] flex items-center justify-between'>
          <div className='flex items-center gap-[40px]'>
            <Link href='/'>
              <LogoImage alt='로고' width={107} height={30} className='h-8 w-auto' />
            </Link>

            <div className='hidden md:block'>
              <Nav />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button className='hidden md:inline'>
              <FaBell
                className='text-gray-300 cursor-pointer
              w-[24px] h-[24px]
              md:w-[32px] md:h-[32px]'
              />
            </button>

            <div className='hidden md:flex items-center gap-2 cursor-pointer'>
              <Dropdown
                iconName='account'
                menuItems={[
                  { label: '마이페이지', href: '/mypage' },
                  { label: '로그아웃', isLogout: true },
                ]}
              />
            </div>

            <div className='inline md:hidden'>
              <Dropdown
                menuItems={[
                  { label: '위키목록', href: '/wikilist' },
                  { label: '자유게시판', href: '/boards' },
                  { label: '알림', href: '/' },
                  { label: '마이페이지', href: '/mypage' },
                  { label: '로그아웃', isLogout: true },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
