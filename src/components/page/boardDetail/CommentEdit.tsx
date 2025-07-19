'use client';

import { useState, useEffect } from 'react';
import { CommentResponse } from '@/components/page/boardDetail/BoardComments';
import Button from '@/components/common/Button';

interface CommentEditProps {
  comment: CommentResponse;
  isEdit: React.Dispatch<React.SetStateAction<boolean>>;
  // onCommentUpdated: (updatedComment: CommentResponse) => void;
}

const CommentEdit = ({ comment, isEdit }: CommentEditProps) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [editedContent, setEditedContent] = useState(comment.content);
  const MAX_CHARACTERS = 500;

  useEffect(() => {
    setCharacterCount(comment.content.length);
  }, [comment.content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleSaveComment = async () => {
    try {
      // const updatedComment = await API(comment.id, { content: editedContent });
      // onCommentUpdated(updatedComment);
    } catch (error) {
      console.log(error);
      // ({ type: 'error', message: '댓글을 작성해주세요.' });
    }
  };

  return (
    <>
      <div className='mt-4 min-w-[320px] rounded-lg bg-grayscale-100 p-4 shadow-md'>
        <h3 className='text-md-semibold text-grayscale-500 lg:text-lg-semibold'>댓글 수정</h3>
        <textarea
          value={editedContent}
          onChange={handleContentChange}
          className='resize-none border-none outline-none h-[55%] w-full overflow-hidden bg-grayscale-100 pt-2 text-grayscale-500'
          placeholder='댓글을 수정하세요.'
          maxLength={MAX_CHARACTERS}
        />

        <div className='flex items-end justify-between'>
          <div className='text-grayscale-300'>
            {characterCount}/{MAX_CHARACTERS}
          </div>
          <div className='flex gap-2'>
            <Button variant='secondary' onClick={() => isEdit(false)}>
              취소
            </Button>
            <Button variant='primary' onClick={handleSaveComment}>
              수정
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentEdit;
