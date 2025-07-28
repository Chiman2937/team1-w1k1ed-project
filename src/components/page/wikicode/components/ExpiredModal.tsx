import Button from '@/components/common/Button';

interface Props {
  onClose: () => void;
}

const ExpiredModal = ({ onClose }: Props) => {
  return (
    <div className='pt-[40px] pl-[10px] w-[295px] md:w-[355px]'>
      <h2
        className='text-lg-semibold text-grayscale-500 mb-[10px]
                  md:text-2lg-semibold'
      >
        5분 이상 글을 쓰지 않아 접속이 끊어졌어요.
      </h2>
      <p
        className='text-md-regular text-grayscale-400 mb-[33px]
                  md:text-lg-regular'
      >
        위키 참여하기를 통해 다시 위키를 수정해주세요
      </p>
      <div className='flex justify-end'>
        <Button variant='primary' className='py-[8px] px-[20px]' onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default ExpiredModal;
