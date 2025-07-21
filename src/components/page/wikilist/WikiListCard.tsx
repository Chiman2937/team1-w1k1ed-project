'use client';

import CopyToClipboard from '@/components/common/CopyToClipboard';
import { Profile } from '../../../app/wikilist/page';
import Link from 'next/link';
import Image from 'next/image';
import BasicProfileImage from '@/assets/images/icon.svg';

interface locationProps {
  nationality: string;
  city: string;
}
// nationality와 city를 조건에 따라 표시
const getLocationText = (profile: locationProps) => {
  const locations = [profile.nationality, profile.city].filter(Boolean);
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

const WikiListCard = (profile: Profile) => (
  <Link
    href={`/wiki/${profile.code}`}
    className='flex flex-row w-auto min-h-[142px] shadow-md hover:shadow-lg p-4 rounded-md justify-center items-center text-grayscale-400'
  >
    <div className='relative size-10 shrink-0 rounded-full overflow-hidden md:size-[50px]'>
      {profile.image ? (
        <Image src={profile.image} alt='프로필 이미지' fill style={{ objectFit: 'cover' }} />
      ) : (
        <BasicProfileImage />
      )}
    </div>
    <div>
      <div className='flex flex-col gap-3.5'>
        <h1
          className='text-grayscale-500 text-xl-regular 
      md:text-2xl-semibold
      '
        >
          {profile.name}
        </h1>
        <p
          className='text-xs-regular
    md:flex-row md:text-md-regular
        '
        >
          {getLocationText(profile)}
        </p>
      </div>
      <div
        className='flex flex-col justify-between text-xs-regular
    md:flex-row md:text-md-regular
    '
      >
        <p>{profile.job}</p>
        <div onClick={handleCopyClick}>
          <CopyToClipboard text={getFullProfileUrl(profile.code)} />
        </div>
      </div>
    </div>
  </Link>
);

export default WikiListCard;
