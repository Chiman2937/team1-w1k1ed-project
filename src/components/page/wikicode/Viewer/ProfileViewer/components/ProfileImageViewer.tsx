import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const ProfileImageViewer = ({ imageUrl }: Props) => {
  return (
    <div className={clsx('relative aspect-square', 'w-[62px]', 'md:w-[71px]', '2xl:w-[200px]')}>
      <Image
        src={imageUrl}
        style={{ objectFit: 'cover' }}
        className='rounded-full aspect-square'
        alt='프로필 이미지'
        fill
      />
    </div>
  );
};

export default ProfileImageViewer;
