import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  imageUrl: string | null;
}

const ProfileImageViewer = ({ imageUrl }: Props) => {
  const nextImageUrl = imageUrl === null ? '/images/default_profile.svg' : imageUrl;
  return (
    <div className={clsx('rounded-full', 'relative aspect-square overflow-hidden', 'w-full')}>
      <Image className='object-cover' src={nextImageUrl} alt='프로필 이미지' layout='fill' />
    </div>
  );
};

export default ProfileImageViewer;
