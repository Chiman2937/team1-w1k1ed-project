import { WikiCodeRes } from '@/app/wiki/[code]/page';
import clsx from 'clsx';
import ProfileField from './ProfileField';

interface Props {
  wikiCodeData: WikiCodeRes;
}

const ProfileContentViewer = ({ wikiCodeData: data }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-[8px]', 'md:gap-[4px]', '2xl:gap-[16px]')}>
      <ProfileField title={'거주도시'} text={String(data.city)} />
      <ProfileField title={'MBTI'} text={String(data.mbti)} />
      <ProfileField title={'직업'} text={String(data.job)} />
      <ProfileField title={'SNS 계정'} text={String(data.sns)} />
      <ProfileField title={'생일'} text={String(data.birthday)} />
      <ProfileField title={'닉네임'} text={String(data.nickname)} />
      <ProfileField title={'혈액형'} text={String(data.bloodType)} />
      <ProfileField title={'국적'} text={String(data.nationality)} />
    </div>
  );
};

export default ProfileContentViewer;
