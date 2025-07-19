import Link from 'next/link';
import Nav from './Nav';
import Dropdown from './Dropdown';
import Logo from './Logo';

const HeaderBeforeLogin = () => {
  return (
    <div className='bg-grayscale-50'>
      <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
        <div className=' mx-auto py-[25px] flex items-center justify-between'>
          <div className='flex items-center gap-[40px]'>
            <Logo />

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
    </div>
  );
};

export default HeaderBeforeLogin;
