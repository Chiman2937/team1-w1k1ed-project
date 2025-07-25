'use client';

import { IoHeartOutline as EmptyHeart } from 'react-icons/io5';
import { IoHeart as FullHeart } from 'react-icons/io5';
import { FiEdit2 as Edit } from 'react-icons/fi';
import { FaRegTrashAlt as Delete } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Button from '@/components/common/Button';

interface ButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

interface LikeButtonProps {
  initialLikeCount: number;
  onClick: () => void;
  isLiked: boolean;
}

// edit, delete button
export const BoardEditButton = ({ onEdit }: ButtonsProps) => {
  return (
    <>
      <div>
        <Button className={'hidden md:inline w-[120px]'} onClick={() => onEdit?.()}>
          수정하기
        </Button>
        <button className='inline md:hidden' onClick={() => onEdit?.()}>
          <Edit className='text-grayscale-400' />
        </button>
      </div>
    </>
  );
};

export const BoardDeleteButton = ({ onDelete }: ButtonsProps) => {
  return (
    <div>
      <Button className={'hidden md:inline w-[120px]'} onClick={() => onDelete?.()}>
        삭제하기
      </Button>
      <button className='inline md:hidden' onClick={() => onDelete?.()}>
        <Delete className='text-grayscale-400' />
      </button>
    </div>
  );
};

export const BoardLikeButton = ({ initialLikeCount, onClick, isLiked }: LikeButtonProps) => {
  return (
    <motion.div whileTap={{ scale: 1.5 }}>
      <button
        className={`flex justify-center items-center gap-[2px] ${isLiked && 'text-primary-green-200'}`}
        onClick={() => onClick()}
      >
        {isLiked ? (
          <FullHeart size={18} className=' text-primary-green-300' />
        ) : (
          <EmptyHeart size={18} className=' text-grayscale-400' />
        )}
        <span className='w-[15px] text-center'>{initialLikeCount}</span>
      </button>
    </motion.div>
  );
};
