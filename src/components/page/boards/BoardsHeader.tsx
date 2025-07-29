'use client';

import Button from '@/components/common/Button';
import SnackBar from '@/components/common/Snackbar';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'cy-toast';

export default function BoardsHeader() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/addboard');
    } else {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='info' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인이 필요한 서비스입니다.
        </SnackBar>
      ));
    }
  };

  return (
    <section className='w-full flex justify-between py-10 items-center relative'>
      <h1 className='text-grayscale-500 text-2xl-semibold'>베스트 게시글</h1>
      <Button onClick={handleClick} className='btn'>
        게시물 등록하기
      </Button>
    </section>
  );
}
