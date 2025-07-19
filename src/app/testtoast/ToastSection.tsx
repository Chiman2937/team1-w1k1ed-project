'use client';
import { toast } from 'cy-toast';
import SnackBar from '../../components/common/Snackbar/Snackbar';

const ModalSection = () => {
  const handleSuccessClick = () => {
    toast.run(
      ({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          내 위키 링크가 복사되었습니다.
        </SnackBar>
      ),
      {
        duration: 3000, // 생략 가능
        closeDuration: 200, // 생략 가능
        openDuration: 200, // 생략 가능
      },
    );
  };

  const handleErrorClick = () => {
    toast.run(({ isClosing, isOpening, index }) => (
      <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
        다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.
      </SnackBar>
    ));
  };

  return (
    <>
      <div>
        <button
          className='text-xl-semibold p-1 border-1 cursor-pointer'
          onClick={handleSuccessClick}
        >
          토스트 - 성공
        </button>
        <button className='text-xl-semibold p-1 border-1 cursor-pointer' onClick={handleErrorClick}>
          토스트 - 실패
        </button>
      </div>
    </>
  );
};

export default ModalSection;
