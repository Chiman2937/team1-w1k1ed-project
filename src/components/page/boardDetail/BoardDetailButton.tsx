'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiHeart } from 'react-icons/ci';
import { FiEdit2 as Edit } from 'react-icons/fi';
import { FaRegTrashAlt as Delete } from 'react-icons/fa';
import Button from '@/components/common/Button';

const BASE_URL = 'https://wikied-api.vercel.app/9-3/';

interface ButtonsProps {
  articleId: string;
}

interface LikeButtonProps extends ButtonsProps {
  initialLikeCount: string;
}

// edit, delete button
export const BoardEdit = ({ articleId }: ButtonsProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (isEditing && !articleId) return;
    setIsEditing(true);
    router.push(`/boards/${articleId}/edit`);
  };

  return (
    <>
      <div>
        <Button className={'hidden md:inline w-[120px]'} onClick={handleEdit} disabled={isEditing}>
          수정하기
        </Button>
        <button className='inline md:hidden' onClick={handleEdit} disabled={isEditing}>
          <Edit />
        </button>
      </div>
    </>
  );
};

export const BoardDelete = ({ articleId }: ButtonsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      if (!window.confirm('정말로 게시물을 삭제하시겠습니까?')) {
        return;
      }
      // delete 동작 구현 필요
      const res = await fetch(`${BASE_URL}/articles/${articleId}`, { method: 'DELETE' });
      if (res.ok) {
        alert('게시물이 삭제되었습니다.'); // 나중에 토스트로 변경
        router.push('/boards');
      } else {
        console.error('삭제 실패');
        // 스낵바 메시지 표시
      }
    } catch (error) {
      console.error('삭제 처리 중 에러 발생:', error);
      if (error instanceof Error) {
        alert(`삭제 처리 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert('삭제 처리 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Button className={'hidden md:inline w-[120px]'} onClick={handleDelete} disabled={isDeleting}>
        삭제하기
      </Button>
      <button className='inline md:hidden' onClick={handleDelete} disabled={isDeleting}>
        <Delete />
      </button>
    </div>
  );
};

export const BoardLike = ({ articleId, initialLikeCount }: LikeButtonProps) => {
  const [currentLikeCount, setCurrentLikeCount] = useState(initialLikeCount);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      // 동작 구현 필요
      const res = await fetch(`${BASE_URL}/articles/${articleId}/like`, {
        method: 'POST',
      });
      if (res.ok) {
        setCurrentLikeCount((prev) => prev + 1); // 백엔드에서 실제 카운트를 받아와야 해서 로직이 변경될 수도 있음
      } else {
        console.error('좋아요 실패');
        // 스낵바 메시지 표시
      }
    } catch (error) {
      console.error('좋아요 처리 중 에러 발생:', error);
      if (error instanceof Error) {
        alert(`좋아요 처리 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert('좋아요 처리 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <>
      <button className='flex items-center gap-[2px]' onClick={handleLike} disabled={isLiking}>
        <CiHeart className='w-[18px] h-[18px]' />
        {currentLikeCount}
      </button>
    </>
  );
};
