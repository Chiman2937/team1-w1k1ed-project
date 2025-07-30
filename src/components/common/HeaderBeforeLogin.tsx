import Link from 'next/link';
import Nav from './Nav';
import HeaderDropdown from './HeaderDropdown';
import Logo from './Logo';

const HeaderBeforeLogin = () => {
  return (
    <div
      className='bg-grayscale-50 shadow-md flex items-center justify-between
        sticky top-0 left-0 w-full z-50
        h-[60px]
        md:h-[80px]'
    >
      <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
        <div className=' mx-auto flex items-center justify-between'>
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
              <HeaderDropdown
                menuItems={[
                  { label: '위키목록', href: '/wikilist' },
                  { label: '자유게시판', href: '/boards' },
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
