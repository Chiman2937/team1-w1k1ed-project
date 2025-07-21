import Button from '@/components/common/Button';
import Link from 'next/link';

const BoardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className='margin-auto my-20 shadow-[0_4px_20px_#00000014] w-[335px] rounded-lg
      md:w-[624px]
      xl:w-[1060px]'
      >
        {children}
      </div>
      <Button variant={'secondary'} size={'sm'} className={'w-[140px] h-[45px] justify-center'}>
        <Link href={'/boards'}>목록으로</Link>
      </Button>
    </>
  );
};

export default BoardContent;
