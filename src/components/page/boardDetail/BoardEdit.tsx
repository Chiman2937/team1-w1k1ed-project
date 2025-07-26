'use client';

import { MdOutlineCancel as CancelButton } from 'react-icons/md';
import { MdAutoFixNormal as SubmitButton } from 'react-icons/md';
import { patchArticle } from '@/api/articleApi';
import Button from '@/components/common/Button';
import BoardInfoForm from '@/components/page/boardDetail/BoardInfo';
import { Modal } from 'react-simplified-package';
import { useState } from 'react';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';
import ToolBar from '@/components/common/TextEditor/ToolBar';

const BoardEdit = ({
  userName,
  userId,
  id,
  date,
  initalTitle,
  initalContent,
  setIsEditing,
}: {
  userName: string;
  id: string;
  userId: number | undefined;
  date: string;
  initalTitle: string;
  initalContent: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState(initalTitle);
  const [content, setContent] = useState(initalContent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { editor, tempFiles, setTempFiles, lengthWithSpaces, lengthWithoutSpaces } = useTextEditor({
    initialContent: initalContent,
  });

  const handleRender = async () => {
    if (!editor) return;
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    setContent(nextContent);
    setIsModalOpen(true);
  };

  const handlePatch = async () => {
    if (!userId) return;

    const formData = {
      title,
      content,
    };
    try {
      await patchArticle(id, formData);
      window.location.reload();
    } catch (error) {
      console.log(error);
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
                disabled={!content}
                variant='primary'
                type='submit'
                className={'hidden md:inline w-[120px]'}
                onClick={handleRender}
              >
                등록하기
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
          <ContentEditor editor={editor} />

          <ToolBar editor={editor} setTempFiles={setTempFiles} />
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
