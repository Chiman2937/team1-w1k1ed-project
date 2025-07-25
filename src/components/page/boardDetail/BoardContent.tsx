import Button from '@/components/common/Button';
import Link from 'next/link';

const BoardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full m-auto'>
      <div
        className='m-auto my-10 shadow-[0_4px_20px_#00000014] min-w-[335px] max-w-[1060px] w-full rounded-lg
      '
      >
        {children}
      </div>
      <div className='flex items-center justify-center'>
        <Button variant={'secondary'} className={'w-[140px] h-[45px] justify-center'}>
          <Link href={'/boards'}>목록으로</Link>
        </Button>
      </div>
    </div>
  );
};

export default BoardContent;
