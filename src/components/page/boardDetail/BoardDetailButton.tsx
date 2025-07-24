'use client';

import { CiHeart } from 'react-icons/ci';
import { FiEdit2 as Edit } from 'react-icons/fi';
import { FaRegTrashAlt as Delete } from 'react-icons/fa';
import Button from '@/components/common/Button';

interface ButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

interface LikeButtonProps {
  initialLikeCount: number;
  onClick: () => void;
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
          <Edit />
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
        <Delete />
      </button>
    </div>
  );
};

export const BoardLikeButton = ({ initialLikeCount, onClick }: LikeButtonProps) => {
  return (
    <button className='flex items-center gap-[2px]' onClick={() => onClick()}>
      <CiHeart className='w-[18px] h-[18px]' />
      {initialLikeCount}
    </button>
  );
};
