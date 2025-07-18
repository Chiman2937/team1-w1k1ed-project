import BoardComments from '@/components/page/boardDetail/BoardComments';
import BoardContent from '@/components/page/boardDetail/BoardContent';
import BoardDetail from '@/components/page/boardDetail/BoardDetail';

interface IParams {
  params: {
    id: string;
  };
}

export default function Board({ params: { id } }: IParams) {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <BoardContent>
          <BoardDetail id={id}></BoardDetail>
        </BoardContent>
      </div>
      <div className='flex flex-col items-center justify-center '>
        <BoardComments id={id}></BoardComments>
      </div>
    </>
  );
}
