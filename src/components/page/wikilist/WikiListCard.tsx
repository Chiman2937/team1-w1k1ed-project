'use client';

import CopyToClipboard from '@/components/common/CopyToClipboard';
import { IoPersonCircle } from 'react-icons/io5';
import { Profile } from '../../../app/wikilist/page';
import Link from 'next/link';
import Image from 'next/image';

// nationality와 city를 조건에 따라 표시
const getLocationText = (nationality: string, city: string) => {
  const locations = [nationality, city].filter(Boolean);
  return locations.join(', ');
};

// Card컴포넌트 안의 CopyToClipboard클릭했을 경우 Card의 Link이벤트 전파 방지
const handleCopyClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

// 현재 도메인과 profile.code를 합쳐서 전체 URL 생성
const getFullProfileUrl = (code: string) => {
  // 클라이언트 사이드에서만 실행되도록 체크
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/wiki/${code}`;
  }
  // 서버 사이드 렌더링 시 기본값
  return `/wiki/${code}`;
};

const WikiListCard = ({ code, image, name, nationality, city, job }: Profile) => {
  return (
    <Link
      href={`/wiki/${code}`}
      className='flex flex-row w-auto min-h-[142px] shadow-md px-6 py-5 hover:shadow-lg gap-5 rounded-md items-center text-grayscale-400
      md:gap-8 md:px-9 md:py-6'
    >
      {image ? (
        <div className='relative size-[60px] shrink-0 rounded-full overflow-hidden md:size-[80px]'>
          <Image
            src={image}
            alt='프로필 이미지'
            fill
            sizes='(max-width: 768px)60,80px'
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className='size-[60px] shrink-0 md:size-[80px]'>
          <IoPersonCircle className='w-full h-full' color='#C6CADA' />
        </div>
      )}
      <div className='flex-1'>
        <div className='flex flex-col gap-3.5'>
          <h1
            className='text-grayscale-500 text-xl-regular 
      md:text-2xl-semibold
      '
          >
            {name}
          </h1>
          <p
            className='text-xs-regular
    md:flex-row md:text-md-regular
        '
          >
            {getLocationText(nationality, city)}
          </p>
        </div>
        <div
          className='flex flex-col text-xs-regular
    md:flex-row  md:justify-between md:text-md-regular
    '
        >
          <p>{job}</p>
          <div onClick={handleCopyClick}>
            <div className='block md:hidden'>
              <CopyToClipboard text={getFullProfileUrl(code)} size='default' />
            </div>
            <div className='hidden md:block'>
              <CopyToClipboard text={getFullProfileUrl(code)} size='large' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WikiListCard;
