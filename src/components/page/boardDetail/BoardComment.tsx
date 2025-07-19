'use client';

import { motion } from 'framer-motion';
import { dateFormater } from '@/utils/date';
import { CommentResponse } from '@/components/page/boardDetail/BoardComments';
import { useState } from 'react';

import Image from 'next/image';
import BasicProfileImage from '@/assets/images/icon.svg';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import CommentEdit from './CommentEdit';

interface CommentItemProps {
  id: number | undefined;
  comment: CommentResponse;
}

const BoardComment = ({ id, comment }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    content,
    createdAt,
    writer: { image, name },
  } = comment;
  return (
    <>
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
              {id === id && (
                // edit, delete 컴포넌트 분리 고려해보기
                <>
                  <motion.div className='hoverMotion' onClick={() => setIsEditing(true)}>
                    <FiEdit2 className='text-grayscale-400' />
                  </motion.div>
                  <motion.div className='hoverMotion'>
                    <FaRegTrashAlt className='text-grayscale-400' />
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
            <CommentEdit comment={comment} isEdit={setIsEditing} />
          </div>
        )}
      </>
    </>
  );
};

export default BoardComment;
