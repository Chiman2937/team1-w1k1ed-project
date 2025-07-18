import Link from 'next/link';
import LogoImage from '@/assets/images/logo.svg';

const Logo = () => {
  return (
    <Link href='/'>
      <LogoImage alt='로고' width={107} height={30} className='h-8 w-auto' />
    </Link>
  );
};

export default Logo;
