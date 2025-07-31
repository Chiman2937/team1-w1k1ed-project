'use client';

import { FaCommentDots as CommentImg } from 'react-icons/fa';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'cy-toast';
import { getComment, postComment } from '@/api/articleApi';
import SnackBar from '@/components/common/Snackbar';
import BoardComment from './BoardComment';
import BoardTextArea from './BoardTextArea';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

export interface CommentWriterResponse {
  image: string;
  name: string;
  id: number;
}

export interface CommentResponse {
  writer: CommentWriterResponse;
  updatedAt: Date | string;
  createdAt: Date | string;
  content: string;
  id: number;
}

const LIMIT = 10;

const BoardComments = ({
  id,
  userId,
  isAuthenticated,
}: {
  id: string;
  userId: number | undefined;
  isAuthenticated: boolean;
}) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string | undefined>();
  const [commentCount, setCommentCount] = useState<number>();

  const useElementInView = (options: IntersectionObserverInit = {}) => {
    const [isInView, setIsInView] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      }, options);

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [options]);

    return [targetRef, isInView] as const;
  };

  const [targetRef, isInView] = useElementInView({ threshold: 1 });

  const router = useRouter();

  const fetchComments = useCallback(async () => {
    if (cursor === null) return;

    try {
      setIsCommentLoading(true);
      const response = await getComment(id, LIMIT, cursor);

      setComments((prev) => {
        const prevCommentIds = new Set(prev.map((comment) => comment.id));

        const newUniqueComments = response.list.filter(
          (comment: CommentResponse) => !prevCommentIds.has(comment.id),
        );

        return [...prev, ...newUniqueComments];
      });
      setCursor(response.nextCursor);
    } catch {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글을 불러오는데 실패했습니다.
        </SnackBar>
      ));
      return router.push('/error');
    } finally {
      setIsCommentLoading(false);
    }
  }, [id, cursor, router]);

  const getAllComment = useCallback(async () => {
    try {
      const response = await getComment(id, 999);
      console.log(response);
      setCommentCount(response.list.length);
    } catch {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글을 불러오는데 실패했습니다.
        </SnackBar>
      ));
      router.push('/error');
    }
  }, [id, router]);

  const handleCommentSubmit = async (formData: { content: string }) => {
    if (!isAuthenticated) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인 후 이용해 주시길 바랍니다.
        </SnackBar>
      ));
      router.push('/login');
    }
    try {
      const newComment = await postComment(id, formData);
      setComments((prevData) => {
        return [newComment, ...prevData];
      });
      getAllComment();
    } catch {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          댓글 작성에 실패했습니다.
        </SnackBar>
      ));
      router.push('/error');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevData) => {
      return prevData.filter((comment) => {
        return comment.id !== commentId;
      });
    });
    getAllComment();
  };

  const handleCommentUpdated = (updatedComment: CommentResponse) => {
    toast.run(({ isClosing, isOpening, index }) => (
      <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
        댓글 수정이 완료되었습니다.
      </SnackBar>
    ));
    setComments((prevData) => {
      return prevData.map((comment) => {
        return comment.id === updatedComment.id ? updatedComment : comment;
      });
    });
  };

  useEffect(() => {
    if (id) {
      getAllComment();
    }
  }, [id, getAllComment]);

  useEffect(() => {
    if (isInView && cursor !== null && !isCommentLoading) {
      fetchComments();
    }
  }, [fetchComments, cursor, isInView, isCommentLoading]);

  return (
    <div
      className='margin-auto w-[335px] rounded-lg
      md:w-[624px]
      xl:w-[1060px]'
    >
      <BoardTextArea
        count={commentCount}
        isAuthenticated={isAuthenticated}
        onSubmit={handleCommentSubmit}
      />
      {commentCount === 0 ? (
        <div className='flex flex-col justify-center items-center mt-24'>
          <CommentImg size={170} className='text-primary-green-200 animation-bounce-comment' />
          <span className='my-5 text-grayscale-400'>댓글이 없습니다</span>
        </div>
      ) : (
        comments.map((comment: CommentResponse) => {
          return (
            <BoardComment
              key={comment.id}
              comment={comment}
              id={userId}
              onDelete={handleDeleteComment}
              onUpdate={handleCommentUpdated}
            />
          );
        })
      )}
      {isCommentLoading && (
        <div className='flex items-center justify-center h-40'>
          <LoadingSpinner.lineCircle lineWeight={8} distanceFromCenter={30} themeColor='#32a68a' />
        </div>
      )}
      <div ref={targetRef} className='p-24' />
    </div>
  );
};

export default BoardComments;
