'use client';

import Animation from '@/components/common/Animation';
import BoardContent from '@/components/page/boardDetail/BoardContent';
import { MdAutoFixNormal as SubmitButton } from 'react-icons/md';
import { postArticle } from '@/api/articleApi';
import Button from '@/components/common/Button';
import BoardInfoForm from '@/components/page/boardDetail/BoardInfo';
import { Modal } from 'react-simplified-package';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';
import ToolBar from '@/components/common/TextEditor/ToolBar';
import { useAuthContext } from '@/context/AuthContext';
import { dateFormater } from '@/utils/date';
import { toast, ToastRender } from 'cy-toast';
import SnackBar from '@/components/common/Snackbar';

const AddBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, isAuthenticated } = useAuthContext();
  const { editor, tempFiles, setTempFiles, lengthWithSpaces, lengthWithoutSpaces } =
    useTextEditor();

  const router = useRouter();

  const userName = user?.name;
  const newDate = new Date().toLocaleDateString();
  const date = dateFormater(newDate);

  const handleRender = async () => {
    if (!editor) return;
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    setContent(nextContent);
    setIsModalOpen(true);
  };

  const handlePost = async () => {
    if (!content) return; //토스트?

    const formData = {
      title,
      content,
    };

    try {
      if (!isAuthenticated) {
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            로그인 후 이용해 주시길 바랍니다.
          </SnackBar>
        ));
        router.push('/login');
      }
      setIsSubmitting(true);
      const response = await postArticle(formData);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물 작성에 성공했습니다.
        </SnackBar>
      ));
      console.log(response);
      router.push(`/boards/${response?.id}`);
    } catch (error) {
      console.log(error);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물 작성에 실패했습니다.
        </SnackBar>
      ));
      setTimeout(() => {
        router.push('/error');
      }, 2000);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <Animation>
      <ToastRender />
      <div className='flex justify-center w-full'>
        <BoardContent>
          <div className='p-5 w-full m-auto'>
            <main className='flex flex-col gap-[30px]'>
              <div className='flex justify-between items-center'>
                <h2 className='text-grayscale-500 text-lg-semibold md:text-2xl-semibold '>
                  게시물 등록하기
                </h2>
                <Button
                  disabled={!lengthWithoutSpaces || isSubmitting}
                  variant='primary'
                  type='submit'
                  className={'hidden md:inline w-[120px]'}
                  onClick={handleRender}
                >
                  {isSubmitting ? '등록중..' : '등록하기'}
                </Button>
                <button onClick={handleRender} className='inline md:hidden'>
                  <SubmitButton className='text-grayscale-400' />
                </button>
              </div>

              <span className='flex items-center gap-[10px] text-md-regular text-gray-400'>
                <p>{userName}</p>
                <p>{date}</p>
              </span>
              <BoardInfoForm title={title} setTitle={setTitle} />
            </main>
          </div>
          {!editor ? null : (
            <div className='px-5 pb-5 flex flex-col gap-[20px]'>
              <div className='flex items-center gap-2 text-md-regular text-grayscale-400'>
                <span>
                  <span>공백 포함: </span>
                  <span className='text-primary-green-200'>{lengthWithSpaces}</span> |
                </span>
                <span>
                  <span>공백 제외: </span>
                  <span className='text-primary-green-200'>{lengthWithoutSpaces}</span>
                </span>
              </div>
              <div className='h-48 overflow-auto'>
                <ContentEditor editor={editor} />
              </div>
              <ToolBar editor={editor} setTempFiles={setTempFiles} />
            </div>
          )}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className='flex flex-col gap-2 min-w-[300px]'>
                <h3 className='text-2xl-semibold text-grayscale-500'>게시물 등록</h3>
                <p className='my-5 text-lg-medium text-grayscale-500'>게시물을 등록하시겠습니까?</p>
                <div className='flex justify-end gap-[10px]'>
                  <Button
                    variant='secondary'
                    className='flex items-center justify-center w-[70px] h-[43px]'
                    onClick={() => setIsModalOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    className='flex items-center justify-center w-[70px] h-[43px]'
                    onClick={handlePost}
                  >
                    등록
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </BoardContent>
      </div>
    </Animation>
  );
};

export default AddBoard;
