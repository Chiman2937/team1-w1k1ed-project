'use client';

import CopyToClipboard from '@/components/common/CopyToClipboard';
import Link from 'next/link';
import { Profile } from '@/api/profile/getProfilesAPI';
import WikiListProfile from './WikiListProfile';

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
      className='flex flex-row w-auto min-h-[142px] 
        shadow-[0_0px_6px_-1px_rgba(0,0,0,0.15),0_4px_6px_-1px_rgba(0,0,0,0.1)]
        hover:shadow-[0_-1px_10px_-2px_rgba(0,0,0,0.2),0_8px_10px_-6px_rgba(0,0,0,0.15)]
        transition-shadow duration-200
        px-6 py-5 gap-5 rounded-md items-center text-grayscale-400
        md:gap-8 md:px-9 md:py-6'
    >
      <WikiListProfile image={image} />

      <div className='flex-1'>
        <div className='flex flex-col gap-3.5'>
          <h1 className='text-grayscale-500 text-xl-regular md:text-2xl-semibold'>{name}</h1>
          <p className='text-xs-regular md:flex-row md:text-md-regular'>
            {getLocationText(nationality, city) || '\u00A0'}
          </p>
        </div>
        <div className='flex flex-col text-xs-regular md:flex-row md:justify-between md:text-md-regular'>
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
