'use client';

import BoardComments from '@/components/page/boardDetail/BoardComments';

import BoardDetail from '@/components/page/boardDetail/BoardDetail';
import { useAuthContext } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import Animation from '@/components/common/Animation';
import { ToastRender } from 'cy-toast';

const Board = () => {
  const param = useParams();
  const id = param.id as string;

  const { isAuthenticated, user } = useAuthContext();
  const userId = user?.id;

  return (
    <>
      <Animation>
        <ToastRender />
        <BoardDetail id={id} userId={userId} isAuthenticated={isAuthenticated}></BoardDetail>
        <BoardComments id={id} userId={userId} isAuthenticated={isAuthenticated}></BoardComments>
      </Animation>
    </>
  );
};
export default Board;
