'use client';

//import BoardComments from '@/components/page/boardDetail/BoardComments';
import BoardContent from '@/components/page/boardDetail/BoardContent';
import BoardDetail from '@/components/page/boardDetail/BoardDetail';
import { useAuthContext } from '@/context/AuthContext';
import { useParams } from 'next/navigation';

const Board = () => {
  const param = useParams();
  const id = param.id as string;

  const { isAuthenticated, user } = useAuthContext();
  const userId = user?.id;

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <BoardContent>
          <BoardDetail id={id} userId={userId} isAuthenticated={isAuthenticated}></BoardDetail>
        </BoardContent>
        {/* <BoardComments id={id}></BoardComments> */}
      </div>
    </>
  );
};
export default Board;
