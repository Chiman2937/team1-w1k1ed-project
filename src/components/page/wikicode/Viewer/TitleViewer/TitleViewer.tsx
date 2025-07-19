import { WikiCodeRes } from '@/app/wiki/[code]/page';
import CopyToClipboard from '@/components/common/CopyToClipboard';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  wikiData: WikiCodeRes;
}

const TitleViewer = ({ wikiData }: Props) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className='flex flex-col mb-[24px] gap-[24px] md:gap-[32px]'>
      <div className='flex flex-row justify-between items-center'>
        <h1
          className='text-grayscale-500
          text-3xl-semibold
          md:text-5xl-semibold'
        >
          {wikiData.name}
        </h1>
        <button
          className={clsx(
            'text-gray-50 bg-primary-green-200 text-lg-semibold',
            'rounded-[10px]',
            'w-[120px] h-[43px]',
            'md:w-[160px] md:h-[45px]',
          )}
        >
          위키 참여하기
        </button>
      </div>
      <div>
        <CopyToClipboard text={currentUrl} />
      </div>
    </div>
  );
};

export default TitleViewer;
