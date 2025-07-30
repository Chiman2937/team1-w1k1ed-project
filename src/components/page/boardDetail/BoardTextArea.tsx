'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { toast } from 'cy-toast';
import SnackBar from '@/components/common/Snackbar';

interface BoardTextAreaProps {
  count: number | undefined;
  isAuthenticated: boolean | undefined;
  onSubmit: (formData: { content: string }) => void;
}

const MAX_CHARACTERS = 500;

const BoardTextArea = ({ count, isAuthenticated, onSubmit }: BoardTextAreaProps) => {
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
    }
    if (content.length <= MAX_CHARACTERS) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글 작성에 성공했습니다.
        </SnackBar>
      ));
      await onSubmit({ content });
      setContent('');
      setCharacterCount(0);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  return (
    <>
      <div className='mt-20 text-lg-semibold lg:text-2lg-semibold'>
        댓글 <span className='text-primary-green-200'>{count}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`mt-3 h-[140px] min-w-[320px] bg-grayscale-100 p-5 rounded-lg
        border-2 border-transparent ${isAuthenticated ? 'focus-within:border-primary-green-200' : 'focus-within:border-red-400'}
        transition-colors duration-300 ease-in-out`}
      >
        <textarea
          className={`resize-none outline-none h-[55%] w-full overflow-hidden bg-grayscale-100 text-grayscale-500 ${isAuthenticated ? '' : 'focus:placeholder:text-red-400'}`}
          value={content}
          onChange={handleContentChange}
          placeholder={isAuthenticated ? '댓글을 입력하세요.' : '로그인 후 이용해주세요.'}
          maxLength={MAX_CHARACTERS}
        />

        <div className='flex items-end justify-between'>
          <div className='text-grayscale-300'>
            {characterCount}/{MAX_CHARACTERS}
          </div>
          <div>
            <Button
              variant='primary'
              disabled={characterCount > MAX_CHARACTERS || !content || !isAuthenticated}
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
