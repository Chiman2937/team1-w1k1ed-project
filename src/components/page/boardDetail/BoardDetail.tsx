'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-simplified-package';
import { toast } from 'cy-toast';
import { useUnloadAlert } from '@/hooks/useUnloadAlert';
import { getDisplayName } from '@/utils/displayName';
import { dateFormater } from '@/utils/date';
import {
  getDetailArticle,
  postArticleLike,
  deleteArticleLike,
  deleteArticle,
} from '@/api/articleApi';
import { BoardDeleteButton, BoardEditButton, BoardLikeButton } from './BoardDetailButton';
import Button from '@/components/common/Button';
import SnackBar from '@/components/common/Snackbar';
import BoardEdit from './BoardEdit';
import Animation from '@/components/common/Animation';
import BoardContent from './BoardContent';
import BoardSkeleton from './BoardSkeleton';
import ContentViewer from '@/components/common/TextEditor/ContentViewer';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [writerId, setWriterId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getDetailArticle(id);

        setIsLoading(true);
        setArticle(article);
        setLikeCount(article.likeCount);
        setIsLiked(article.isLiked);
        setWriterId(article.writer.id);
      } catch {
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            게시물을 불러오는데 실패했습니다.
          </SnackBar>
        ));
        router.push('/error');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, router, isEditing]);

  useUnloadAlert({ activeBy: isEditing });

  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            로그인 후 이용해 주시길 바랍니다.
          </SnackBar>
        ));
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

  const handleDeleteModal = async () => {
    if (!isAuthenticated) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
    }
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물이 삭제되었습니다.
        </SnackBar>
      ));
      router.push('/boards');
    } catch {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          게시물 삭제에 실패했습니다.
        </SnackBar>
      ));
      router.push('/error');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEdit = () => {
    if (!isAuthenticated) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
    }
    setIsEditing(true);
  };

  if (!article || isLoading)
    return (
      <Animation>
        <BoardSkeleton />
      </Animation>
    );

  const {
    title,
    content,
    createdAt,
    updatedAt,
    writer: { name },
  } = article;
  const newName = getDisplayName(name);
  const date = dateFormater(createdAt);
  const updatedDate = dateFormater(updatedAt);

  if (isEditing)
    return (
      <Animation>
        <BoardContent>
          <BoardEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userName={newName}
            id={id}
            userId={userId}
            date={date}
            initalTitle={title}
            initalContent={content}
          />
        </BoardContent>
      </Animation>
    );

  return (
    <Animation>
      <BoardContent>
        <div className='p-5'>
          <header className='flex flex-col gap-[30px]'>
            <section className='flex justify-between items-center'>
              <h1 className='text-lg-semibold md:text-2xl-semibold  text-grayscale-600'>{title}</h1>
              <div className='flex gap-[14px]'>
                {userId === writerId && (
                  <>
                    <BoardEditButton onEdit={handleEdit} />
                    <BoardDeleteButton onDelete={handleDeleteModal} isEditing={isEditing} />
                  </>
                )}
              </div>
            </section>
            <section className='flex justify-between items-center  text-grayscale-400 text-md-regular pb-5 border-b border-grayscale-200'>
              <div className='flex gap-[10px] '>
                <p>{newName}</p>
                <p>{updatedDate}</p>
              </div>
              <BoardLikeButton
                isAuthenticated={isAuthenticated}
                initialLikeCount={likeCount}
                onClick={handleLike}
                isLiked={isLiked}
              />
            </section>
            <main className='flex flex-col gap-[20px] min-h-64 h-auto overflow-y-auto'>
              <ContentViewer content={content} />
            </main>
          </header>
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className='flex flex-col gap-2 min-w-[300px]'>
              <h3 className='text-2xl-semibold text-grayscale-500'>게시물 삭제</h3>
              <p className='my-5 text-lg-medium text-grayscale-500'>게시물을 삭제하시겠습니까?</p>
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
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </BoardContent>
    </Animation>
  );
};

export default BoardDetail;
