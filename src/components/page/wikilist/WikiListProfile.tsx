'use client';
import Image from 'next/image';
import { useState } from 'react';

const WikiListProfile = ({ image }: { image: string }) => {
  const [imageError, setImageError] = useState(false);
  const hasValidImage = image && image.trim() !== '';

  if (!hasValidImage || imageError) {
    return (
      <div className='relative size-[60px] shrink-0 rounded-full overflow-hidden bg-gray-100 md:size-[80px]'>
        <Image
          src='/images/type=profile.png'
          alt='기본 프로필 이미지'
          fill
          priority
          sizes='(max-width: 768px) 60px, 80px'
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>
    );
  }

  return (
    <div className='relative size-[60px] shrink-0 rounded-full overflow-hidden md:size-[80px]'>
      <Image
        src={image}
        alt='프로필 이미지'
        fill
        priority
        sizes='(max-width: 768px) 60px, 80px'
        style={{ objectFit: 'cover' }}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default WikiListProfile;
