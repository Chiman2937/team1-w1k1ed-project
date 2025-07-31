'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Animation from '@/components/common/Animation';
import BoardDetail from '@/components/page/boardDetail/BoardDetail';
import BoardComments from '@/components/page/boardDetail/BoardComments';

const Board = () => {
  const [iscomment, setIsComment] = useState(true);
  const param = useParams();
  const id = param.id as string;

  const { isAuthenticated, user } = useAuthContext();
  const userId = user?.id;

  return (
    <>
      <Animation>
        <BoardDetail
          id={id}
          userId={userId}
          isAuthenticated={isAuthenticated}
          setIsComment={setIsComment}
        ></BoardDetail>
        {iscomment && (
          <BoardComments id={id} userId={userId} isAuthenticated={isAuthenticated}></BoardComments>
        )}
      </Animation>
    </>
  );
};
export default Board;
