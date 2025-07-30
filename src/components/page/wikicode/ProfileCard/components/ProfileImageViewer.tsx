import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const ProfileImageViewer = ({ imageUrl }: Props) => {
  return (
    <div className={clsx('rounded-full', 'relative aspect-square overflow-hidden', 'w-full')}>
      <Image className='object-cover' src={imageUrl} alt='프로필 이미지' layout='fill' />
    </div>
  );
};

export default ProfileImageViewer;
