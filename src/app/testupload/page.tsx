'use client';

import { uploadFileAPI, UploadType } from '@/api/uploadFileAPI';
import { useState } from 'react';

const TestUpload = () => {
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileObject(file);
  };

  const handleImageUploadClick = async (type: UploadType) => {
    if (!fileObject) return;
    setError(null);
    setLoading(true);
    try {
      const url = await uploadFileAPI({ fileObject: fileObject, type });
      setUploadUrl(url);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='bg-gray-100 flex flex-col gap-[10px] border-1 p-4 m-2 items-center'>
        <label>
          이미지 선택
          <input type='file' onChange={handleInputChange} />
        </label>
        <button
          className='border-1 bg-amber-200 p-1'
          onClick={() => handleImageUploadClick('image')}
        >
          이미지 업로드
        </button>
      </div>
      <div className='bg-gray-100 flex flex-col gap-[10px] border-1 p-4 m-2 items-center'>
        <label>
          비디오 선택
          <input type='file' onChange={handleInputChange} />
        </label>
        <button
          className='border-1 bg-amber-200 p-1'
          onClick={() => handleImageUploadClick('video')}
        >
          비디오 업로드
        </button>
      </div>
      {loading && <div>로딩중...</div>}
      {error && (
        <div>
          오류: <p>{error.message}</p>
        </div>
      )}
      {uploadUrl && (
        <div className='flex flex-col items-center'>
          업로드 성공!: <p>{uploadUrl}</p>
        </div>
      )}
    </div>
  );
};

export default TestUpload;
