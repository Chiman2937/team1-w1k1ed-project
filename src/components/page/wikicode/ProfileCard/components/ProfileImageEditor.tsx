import { useWikiContext } from '@/context/WikiContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { FiCamera as IconCamera } from 'react-icons/fi';
import { TiDelete as IconDelete } from 'react-icons/ti';
import Button from '@/components/common/Button';
interface Props {
  imageUrl: string | null;
}

const ProfileImageEditor = ({ imageUrl }: Props) => {
  const { wikiProfile, setWikiProfile, tempProfileImageFile, setTempProfileImageFile } =
    useWikiContext();

  const [isImageChanged, setIsImageChanged] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const addImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!wikiProfile) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const imageBlobURL = URL.createObjectURL(file);
    if (!imageBlobURL) return;

    if (tempProfileImageFile && wikiProfile.image !== null) {
      URL.revokeObjectURL(wikiProfile.image);
    }
    setWikiProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        image: imageBlobURL,
      };
    });
    setTempProfileImageFile(file);
    setIsImageChanged(true);
    e.target.value = '';
  };

  const handleImageDefault = () => {
    if (!isImageChanged && imageUrl === null) return;
    setWikiProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        image: null,
      };
    });
    setTempProfileImageFile(null);
    if (imageUrl === null) {
      setIsImageChanged(false);
      return;
    }

    setIsImageChanged(true);
  };

  const handleImageDelete = () => {
    setWikiProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        image: imageUrl,
      };
    });
    setTempProfileImageFile(null);
    setIsImageChanged(false);
  };

  if (!wikiProfile) return;

  const nextImageSrc =
    wikiProfile.image === null ? '/images/default_profile.svg' : wikiProfile.image;

  return (
    <div className='flex flex-col items-center gap-[10px]'>
      <Button variant='secondary' className='px-2 py-1' onClick={handleImageDefault}>
        기본 이미지
      </Button>

      <div className='relative aspect-square w-full'>
        <div className={clsx('relative rounded-full overflow-hidden', 'w-full h-full')}>
          <Image className='object-cover' src={nextImageSrc} alt='프로필 이미지' layout='fill' />
          <div
            className={clsx('w-full h-full opacity-30 bg-black', 'cursor-pointer')}
            onClick={addImage}
          />
          <div className='absolute opacity-80 text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] aspect-square w-1/5 pointer-events-none'>
            <IconCamera className='w-full h-full' />
          </div>
          <input ref={inputRef} className='hidden' type='file' onChange={handleInputChange} />
        </div>
        {isImageChanged && (
          <div
            className={clsx(
              'absolute top-[5%] right-[5%] z-1',
              'aspect-square w-1/5',
              'rounded-full ',
              'bg-white',
            )}
            onClick={handleImageDelete}
          >
            <IconDelete className='w-full h-full text-gray-400 hover:text-gray-500 cursor-pointer' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageEditor;
