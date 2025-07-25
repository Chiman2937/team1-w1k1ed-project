'use client';

import BoardComment from './BoardComment';
import BoardTextArea from './BoardTextArea';
import { useRouter } from 'next/navigation';
import { getComment, postComment } from '@/api/articleApi';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';

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
  const [cursor, setCursor] = useState<string | undefined>();
  const [commentCount, setCommentCount] = useState<number>();

  const router = useRouter();
  const { ref, inView } = useInView();

  const fetchComments = useCallback(async () => {
    if (!cursor) return;
    try {
      const response = await getComment(id, cursor);
      setComments((prev) => [...prev, ...response.list]);
      setCursor(response.nextCursor);
    } catch (error) {
      console.log(error);
      router.push('/error');
    }
  }, [id, cursor, router]);

  const getAllComment = async () => {
    try {
      const response = await getComment(id, '9999');
      setCommentCount(response.count);
    } catch (error) {
      console.log(error);
      router.push('/error');
    }
  };

  const handleCommentSubmit = async (formData: { content: string }) => {
    try {
      if (isAuthenticated) {
        const newComment = await postComment(id, formData);
        setComments((prevData) => {
          return [newComment, ...prevData];
        });
        getAllComment();
      } else {
        // 토스트 추가
        router.push('/login');
      }
    } catch (e) {
      // 댓글 작성 오류 토스트
      console.log(e);
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
    setComments((prevData) => {
      return prevData.map((comment) => {
        return comment.id === updatedComment.id ? updatedComment : comment;
      });
    });
  };

  useEffect(() => {
    getAllComment();
  });

  useEffect(() => {
    if (inView && cursor !== null) {
      fetchComments();
    }
  }, [fetchComments, cursor, inView]);

  return (
    <div
      className='margin-auto w-[335px] rounded-lg
      md:w-[624px]
      xl:w-[1060px]'
    >
      <BoardTextArea
        count={commentCount}
        isLogin={isAuthenticated}
        onSubmit={handleCommentSubmit}
      />
      {commentCount === 0 ? (
        <>댓글이 없습니다</>
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
      <div ref={ref} className=' h-28' />
    </div>
  );
};

export default BoardComments;
