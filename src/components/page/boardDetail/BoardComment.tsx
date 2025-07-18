'use client';

import { motion } from 'framer-motion';
import { dateFormater } from '@/utils/date';
import { CommentResponse } from '@/components/page/boardDetail/BoardComments';

import Image from 'next/image';
import BasicProfileImage from '@/assets/images/icon.svg';
import EditIcon from '@/assets/images/type=edit.svg';
import DeleteIcon from '@/assets/images/type=delete.svg';

interface CommentItemProps {
  id: number | undefined;
  comment: CommentResponse;
}

const BoardComment = ({ id, comment }: CommentItemProps) => {
  const isEditing = false;
  const {
    content,
    createdAt,
    writer: { image, name },
  } = comment;
  return (
    <>
      <>
        <div className={`mt-7 ${isEditing ? 'hidden' : ''}`}>
          <div className=' relative min-w-[320px] gap-2.5 rounded-10 px-5 py-4 shadow-md'>
            <div className='flex '>
              <div className='relative size-10 shrink-0 rounded-full md:size-[50px]'>
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
                <>
                  <motion.div className='hoverMotion'>
                    <EditIcon />
                  </motion.div>
                  <motion.div className='hoverMotion'>
                    <DeleteIcon />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* {isEditing && (
          <CommentEditModal comment={comment} onCommentUpdated={handleCommentUpdated} />
        )} */}
      </>
    </>
  );
};

export default BoardComment;
