'use client';

import { MdOutlineCancel as CancelButton } from 'react-icons/md';
import { MdAutoFixNormal as SubmitButton } from 'react-icons/md';
import Button from '@/components/common/Button';
import BoardInfoForm from '@/components/page/boardDetail/BoardInfo';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const BoardEdit = ({
  userName,
  date,
  initalTitle,
  initalContent,
  setIsEditing,
}: {
  userName: string;
  date: string;
  initalTitle: string;
  initalContent: string;
  setIsEditing: () => void;
}) => {
  const [title, setTitle] = useState(initalTitle);
  // const [content, setContent] = useState(initalContent);
  // const [isEditing, setIsEditing] = useState(false);

  const param = useParams();
  console.log(param);
  return (
    <>
      <div className='p-5'>
        <main className='flex flex-col gap-[30px]'>
          <div className='flex justify-between items-center'>
            <h2 className='text-primary-green-300 text-lg-semibold md:text-2xl-semibold '>
              게시물 수정하기
            </h2>
            <div className='flex gap-[14px]'>
              <Button
                onClick={() => setIsEditing()}
                variant='secondary'
                className={'hidden md:inline w-[120px]'}
              >
                취소
              </Button>
              <button onClick={() => setIsEditing()} className='inline md:hidden'>
                <CancelButton className='text-grayscale-400' />
              </button>
              <Button
                disabled={true}
                variant='primary'
                type='submit'
                className={'hidden md:inline w-[120px]'}
              >
                수정중...{/* {isEditing ? '등록 중...' : '등록하기'} */}
              </Button>
              <button onClick={() => setIsEditing()} className='inline md:hidden'>
                <SubmitButton className='text-grayscale-400' />
              </button>
            </div>
          </div>

          <span className='flex items-center gap-[10px] text-md-regular text-gray-400'>
            <p>{userName}</p>
            <p>{date}</p>
          </span>
          <BoardInfoForm title={title} setTitle={setTitle} />
          {initalContent}
          {/* TextEditor */}
          {/* TextEditor */}
        </main>
      </div>
    </>
  );
};

export default BoardEdit;
