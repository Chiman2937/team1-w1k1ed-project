import Image from 'next/image';
import NoResultImg from '@/assets/images/search-no-result.png';

const NoResultFallback = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <div
      className='flex flex-col justify-center items-center gap-[35px] text-grayscale-400 py-8
        md:gap-8 min-w-[389px]
        '
    >
      <p className='text-lg-regular'>&apos;{searchTerm}&apos;과(와) 일치하는 검색 결과가 없어요</p>
      <Image
        src={NoResultImg}
        alt='탐색기 이미지'
        className='h-[108px] w-[108px]
          md:h-36 md:w-36
          '
      />
    </div>
  );
};

export default NoResultFallback;
