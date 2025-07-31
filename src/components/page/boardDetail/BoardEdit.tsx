'use client';

import { MdOutlineCancel as CancelButton } from 'react-icons/md';
import { MdAutoFixNormal as SubmitButton } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-simplified-package';
import { patchArticle } from '@/api/articleApi';
import { toast } from 'cy-toast';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import { getHtmlFirstImageSrc } from '@/components/common/TextEditor/utils/handlers/getHtmlFirstImageSrc';
import { useUnloadAlert } from '@/hooks/useUnloadAlert';
import Button from '@/components/common/Button';
import ToolBar from '@/components/common/TextEditor/ToolBar';
import SnackBar from '@/components/common/Snackbar';
import BoardInfoForm from '@/components/page/boardDetail/BoardInfo';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';

const BoardEdit = ({
  userName,
  userId,
  id,
  date,
  initalTitle,
  initalContent,
  isEditing,
  setIsEditing,
}: {
  userName: string;
  id: string;
  userId: number | undefined;
  date: string;
  initalTitle: string;
  initalContent: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState(initalTitle);
  const [content, setContent] = useState(initalContent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { editor, tempFiles, setTempFiles, lengthWithSpaces, lengthWithoutSpaces } = useTextEditor({
    initialContent: initalContent,
  });

  const router = useRouter();

  const handleRender = async () => {
    if (!editor) return;
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    setContent(nextContent);
    setIsModalOpen(true);
  };

  useUnloadAlert({ activeBy: isEditing });

  const handlePatch = async () => {
    if (!userId) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
    }

    const image = getHtmlFirstImageSrc(content);

    let formData;

    if (!image) {
      formData = {
        title,
        content,
      };
    } else {
      formData = {
        image,
        title,
        content,
      };
    }

    try {
      await patchArticle(id, formData);

      router.refresh();
    } catch {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물 수정에 실패했습니다.
        </SnackBar>
      ));
      router.push('/error');
    } finally {
      setIsEditing(false);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물 수정이 완료되었습니다.
        </SnackBar>
      ));
    }
  };

  return (
    <>
      <div className='p-5 w-full'>
        <main className='flex flex-col gap-[30px]'>
          <div className='flex justify-between items-center'>
            <h2 className='text-primary-green-300 text-lg-semibold md:text-2xl-semibold '>
              게시물 수정하기
            </h2>
            <div className='flex gap-[14px]'>
              <Button
                onClick={() => setIsEditing(false)}
                variant='secondary'
                className={'hidden md:inline w-[120px]'}
              >
                취소
              </Button>
              <button onClick={() => setIsEditing(false)} className='inline md:hidden'>
                <CancelButton className='text-grayscale-400' />
              </button>
              <Button
                disabled={!content || !isEditing}
                variant='primary'
                type='submit'
                className={'hidden md:inline w-[120px]'}
                onClick={handleRender}
              >
                {!isEditing ? '수정중..' : '수정하기'}
              </Button>
              <button onClick={handleRender} className='inline md:hidden'>
                <SubmitButton className='text-grayscale-400' />
              </button>
            </div>
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
          <ToolBar editor={editor} setTempFiles={setTempFiles} />
          <div className='min-h-64 h-auto overflow-auto'>
            <ContentEditor editor={editor} />
          </div>
          <div className='flex items-center gap-2 justify-end text-md-regular text-grayscale-400'>
            <span>
              <span>공백 포함: </span>
              <span className='text-primary-green-200'>{lengthWithSpaces}</span> |
            </span>
            <span>
              <span>공백 제외: </span>
              <span className='text-primary-green-200'>{lengthWithoutSpaces}</span>
            </span>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className='flex flex-col gap-2 min-w-[300px]'>
            <h3 className='text-2xl-semibold text-grayscale-500'>게시물 수정</h3>
            <p className='my-5 text-lg-medium text-grayscale-500'>게시물을 수정하시겠습니까?</p>
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
                onClick={handlePatch}
              >
                수정
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BoardEdit;
