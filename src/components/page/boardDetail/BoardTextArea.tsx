'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

interface BoardTextAreaProps {
  count: number | undefined;
  isLogin: boolean | undefined;
  onSubmit: (formData: { content: string }) => void;
}

const MAX_CHARACTERS = 500;

const BoardTextArea = ({ count, isLogin, onSubmit }: BoardTextAreaProps) => {
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length <= MAX_CHARACTERS) {
      await onSubmit({ content });
      setContent('');
      setCharacterCount(0);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  // const handleGuestRedirect = () => {
  //   toast 알림
  //   redirect
  // };

  return (
    <>
      <div className='mt-20 text-lg-semibold lg:text-2lg-semibold'>
        댓글 <span className='text-primary-green-200'>{count}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className='mt-3 h-[140px] min-w-[320px] bg-grayscale-100 p-5 rounded-lg'
      >
        <textarea
          className='resize-none border-none outline-none h-[55%] w-full overflow-hidden bg-grayscale-100 text-grayscale-500'
          value={content}
          onChange={handleContentChange}
          placeholder='댓글을 입력하세요.'
          maxLength={MAX_CHARACTERS}
        />

        <div className='flex items-end justify-between'>
          <div className='text-grayscale-300'>
            {characterCount}/{MAX_CHARACTERS}
          </div>
          <div>
            <Button
              variant='primary'
              disabled={characterCount > MAX_CHARACTERS || !content || !isLogin}
              type='submit'
            >
              댓글 작성
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BoardTextArea;
