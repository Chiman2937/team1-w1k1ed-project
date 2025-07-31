'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'cy-toast';
import Button from '@/components/common/Button';
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
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const router = useRouter();

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingForm || characterCount > MAX_CHARACTERS || !content.trim() || !isAuthenticated)
      return;

    if (!isAuthenticated) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
      return;
    }

    if (!content.trim()) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          내용을 입력해주세요.
        </SnackBar>
      ));
      return;
    }

    setIsSubmittingForm(true);

    try {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글 작성에 성공했습니다.
        </SnackBar>
      ));
      await onSubmit({ content });
      setContent('');
      setCharacterCount(0);
    } catch (error) {
      console.error('댓글 작성 중 에러:', error);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글 작성에 실패했습니다.
        </SnackBar>
      ));
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        handleSubmit(e as unknown as React.FormEvent);
      }, 300);
    }
  };
  return (
    <>
      <div className='mt-20 text-lg-semibold lg:text-2lg-semibold'>
        댓글 <span className='text-primary-green-200'>{count}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`mt-3 h-[140px] min-w-[320px] bg-grayscale-100 p-5 rounded-lg
        border-2 ${isAuthenticated ? 'border-transparent focus-within:border-primary-green-200' : 'border-red-400'}
        transition-colors duration-300 ease-in-out`}
      >
        <textarea
          className={`resize-none outline-none h-[55%] w-full overflow-hidden bg-grayscale-100 text-grayscale-500 ${isAuthenticated ? '' : 'placeholder:text-red-500 placeholder:text-lg-semibold'}`}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder={isAuthenticated ? '댓글을 입력하세요.' : '로그인 후 이용해주세요.'}
          maxLength={MAX_CHARACTERS}
          disabled={!isAuthenticated}
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
