import CopyToClipboard from '@/components/common/CopyToClipboard';
import { Profile } from '../../../app/wikilist/page';
import Link from 'next/link';

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

const WikiListCard = (profile: Profile) => (
  <Link
    href={`/wiki/${profile.code}`}
    className='flex flex-col w-auto min-h-[142px] shadow-md hover:shadow-lg p-4 rounded-md justify-center text-grayscale-400'
  >
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
        <CopyToClipboard text={'/' + profile.code} />
      </div>
    </div>
  </Link>
);

export default WikiListCard;
