import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { FiCamera as IconCamera } from 'react-icons/fi';
import { TiDelete as IconDelete } from 'react-icons/ti';
interface Props {
  imageUrl: string;
}

const ProfileImageEditor = ({ imageUrl }: Props) => {
  const [blob, setBlob] = useState('');
  const [_file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const addImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageBlobURL = URL.createObjectURL(file);
    if (blob) URL.revokeObjectURL(blob);
    setBlob(imageBlobURL);
    setFile(file);
    e.target.value = '';
  };

  const handleImageDelete = () => {
    setBlob('');
    setFile(null);
  };

  return (
    <div className='relative aspect-square w-full'>
      <div className={clsx('relative rounded-full overflow-hidden', 'w-full h-full')}>
        <Image className='object-cover' src={blob || imageUrl} alt='프로필 이미지' layout='fill' />
        <div
          className={clsx('w-full h-full opacity-30 bg-black', 'cursor-pointer')}
          onClick={addImage}
        />
        <div className='absolute opacity-80 text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] aspect-square w-1/5 pointer-events-none'>
          <IconCamera className='w-full h-full' />
        </div>
        <input ref={inputRef} className='hidden' type='file' onChange={handleInputChange} />
      </div>
      {blob && (
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
  );
};

export default ProfileImageEditor;
