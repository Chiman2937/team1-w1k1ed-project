'use client';

import { dateFormater } from '@/utils/date';
import { useRouter } from 'next/navigation';
import {
  getDetailArticle,
  postArticleLike,
  deleteArticleLike,
  deleteArticle,
} from '@/api/articleApi';
import BoardEdit from './BoardEdit';
import { BoardDeleteButton, BoardEditButton, BoardLikeButton } from './BoardDetailButton';
import { useState, useEffect } from 'react';

const BoardDetail = ({
  id,
  userId,
  isAuthenticated,
}: {
  id: string;
  userId: number | undefined;
  isAuthenticated: boolean;
}) => {
  const [article, setArticle] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [writerId, setWriterId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getDetailArticle(id);
        setArticle(article);
        setLikeCount(article.likeCount);
        setIsLiked(article.isLiked);
        setWriterId(article.writer.id);
      } catch (error) {
        console.log(error);
        router.push('/error');
      }
    };
    if (id) {
      fetchArticle();
    }
  }, [id, router]);

  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        //Toast 사용하기
        router.push('/login');
      }
      if (isLiked) {
        await deleteArticleLike(id);
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await postArticleLike(id);
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
      router.push('/error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      // modal 삭제하시겟습니까?
      // toast 삭제되었습니다
      router.push('/boards');
    } catch (error) {
      console.log(error);
      //toast 삭제 실패
      router.push('/error');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!article) return null; // 로딩바로 변경

  const {
    title,
    content,
    updatedAt,
    writer: { name },
  } = article;

  const date = dateFormater(updatedAt);

  if (isEditing) return <BoardEdit initalTitle={title} initalContent={content} />;

  return (
    <div className='p-5'>
      <header className='flex flex-col gap-[30px]'>
        <section className='flex justify-between items-center'>
          <h1 className='text-3xl-semibold'>{title}</h1>
          <div className='flex gap-[14px]'>
            {userId !== writerId /* 수정해야함 */ && (
              <>
                <BoardEditButton onEdit={handleEdit} />
                <BoardDeleteButton onDelete={handleDelete} />
              </>
            )}
          </div>
        </section>
        <section className='flex justify-between items-center  text-grayscale-400 text-md-regular'>
          <div className='flex gap-[10px]'>
            <p>{name}</p>
            <p>{date}</p>
          </div>
          <BoardLikeButton initialLikeCount={likeCount} onClick={handleLike} />
        </section>
        <main className='flex flex-col gap-[20px]'>
          <span className='text-lg-regular text-grayscale-400'>{content}</span>
        </main>
      </header>
    </div>
  );
};

export default BoardDetail;
