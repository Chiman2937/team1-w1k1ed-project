import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href='/'>
      <Image src='/images/logo.svg' alt='로고' width={107} height={30} className='h-8 w-auto' />
    </Link>
  );
};

export default Logo;
