import BoardComments from '@/components/page/boardDetail/BoardComments';
import BoardContent from '@/components/page/boardDetail/BoardContent';
import BoardDetail from '@/components/page/boardDetail/BoardDetail';

export default async function Board({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <BoardContent>
          <BoardDetail id={id}></BoardDetail>
        </BoardContent>
        <BoardComments id={id}></BoardComments>
      </div>
    </>
  );
}
