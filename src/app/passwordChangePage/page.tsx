import PasswordChangeForm from '@/components/common/PasswordChangeForm';
import Image from 'next/image';
import Link from 'next/link';

const PasswordChangePage = () => {
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

      <PasswordChangeForm />
    </div>
  );
};

export default PasswordChangePage;
