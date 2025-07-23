'use client';

import Button from '@/components/common/Button';
import BoardContent from '@/components/page/boardDetail/BoardContent';
// import BoardInfoForm from '@/components/page/boardDetail/BoardInfo';
import { useParams } from 'next/navigation';
// import { useState } from 'react';

const BoardEdit = () => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });
  // const [isEditing, setIsEditing] = useState(false);

  const param = useParams();
  console.log(param);
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <BoardContent>
          <main className='md:profile-shadow flex w-full max-w-[1060px] flex-col gap-3 rounded-10 md:gap-5 md:px-[30px] md:py-[40px]'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg-semibold md:text-xl-semibold lg:text-2xl-semibold'>
                게시물 수정하기
              </h2>
              <Button disabled={true} variant='primary'>
                아무튼 버튼 {/* isEditing ? '등록 중...' : '등록하기' */}
              </Button>
            </div>

            <span className='text-xs-regular text-gray-400 md:text-lg-regular'>
              {/* {user?.name} {dateToString(new Date())} */}
            </span>
            {/* <BoardInfoForm
              title={'fetch 해서 가져오기'}
              setTitle={setTitle}
              contentLength={contentLength}
            /> */}
            {/* TextEditor */}
            {/* TextEditor */}
          </main>
        </BoardContent>
      </div>
    </>
  );
};

export default BoardEdit;
