'use client';

import { motion } from 'framer-motion';
import { dateFormater } from '@/utils/date';
import { CommentResponse } from '@/components/page/boardDetail/BoardComments';
import { useState } from 'react';

import Image from 'next/image';
import BasicProfileImage from '@/assets/images/default_profile.svg';
import { Modal } from 'react-simplified-package';
import { useRouter } from 'next/navigation';
import { deleteComment } from '@/api/articleApi';
import { FiEdit2 as Edit } from 'react-icons/fi';
import { FaRegTrashAlt as Delete } from 'react-icons/fa';
import CommentEdit from './CommentEdit';
import Button from '@/components/common/Button';

interface CommentItemProps {
  id: number | undefined;
  comment: CommentResponse;
  onDelete: (commentId: number) => void;
  onUpdate: (updatedComment: CommentResponse) => void;
}

const BoardComment = ({ id, comment, onDelete, onUpdate }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id);
      onDelete(comment.id);
      // 댓글이 삭제되었습니다 토스트
    } catch (error) {
      console.log(error);
      router.push('/500');
    }
  };

  const {
    content,
    createdAt,
    writer: { image, name },
  } = comment;
  return (
    <>
      <div className={`mt-7 ${isEditing ? 'hidden' : ''}`}>
        <div className=' relative min-w-[320px] gap-2.5 rounded-lg px-5 py-4 shadow-md'>
          <div className='flex '>
            <div className='relative size-10 shrink-0 rounded-full overflow-hidden md:size-[50px]'>
              {image ? (
                <Image src={image} alt='프로필 이미지' fill style={{ objectFit: 'cover' }} />
              ) : (
                <BasicProfileImage />
              )}
            </div>
            <div className='  ml-[15px] flex-col break-words text-grayscale-500 lg:max-w-none'>
              <div className='text-lg-semibold lg:text-2lg-semibold '>{name}</div>
              <div className='flex-wrap break-words text-md-regular lg:text-lg-regular'>
                {content}
              </div>
              <div className='text-md-regular text-grayscale-400 lg:text-lg-regular'>
                {dateFormater(createdAt)}
              </div>
            </div>
          </div>
          <div className=' absolute right-5 top-4 flex justify-end gap-2'>
            {id === comment.writer.id && (
              // edit, delete 컴포넌트 분리 고려해보기
              <>
                <motion.div className='hoverMotion' onClick={() => setIsEditing(true)}>
                  <Edit className='text-grayscale-400' />
                </motion.div>
                <motion.div className='hoverMotion' onClick={() => setIsModalOpen(true)}>
                  <Delete className='text-grayscale-400' />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className='bg-grayscale-50 rounded-lg mt-7 p-5 shadow-md'>
          <div className='flex'>
            <div className='relative size-10 shrink-0 rounded-full overflow-hidden md:size-[50px]'>
              {image ? (
                <Image src={image} alt='프로필 이미지' fill style={{ objectFit: 'cover' }} />
              ) : (
                <BasicProfileImage />
              )}
            </div>
            <div className='  ml-[15px] flex-col break-words text-grayscale-500 lg:max-w-none'>
              <div className='text-lg-semibold lg:text-2lg-semibold '>{name}</div>
              <div className='text-md-regular text-grayscale-400 lg:text-lg-regular'>
                {dateFormater(createdAt)}
              </div>
            </div>
          </div>
          <CommentEdit comment={comment} isEdit={setIsEditing} onUpdate={onUpdate} />
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className='flex flex-col gap-2 min-w-[300px]'>
            <h3 className='text-21g-semibold text-grayscale-600'>댓글 삭제</h3>
            <p className='my-5 text-lg-medium text-grayscale-600'>댓글을 삭제하시겠습니까?</p>
            <div className='flex justify-end gap-[10px]'>
              <Button
                variant='secondary'
                className='flex items-center justify-center w-[70px]'
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                className='flex items-center justify-center w-[70px]'
                onClick={handleDeleteComment}
              >
                삭제
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BoardComment;
