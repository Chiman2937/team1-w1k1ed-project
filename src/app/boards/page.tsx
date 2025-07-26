import BoardsBest from '@/components/page/boards/BoardsBest';
import BoardsHeader from '@/components/page/boards/BoardsHeader';
import BoardsLists from '@/components/page/boards/BoardsLists';
import { Suspense } from 'react';

export default function Boards() {
  return (
    <main
      className='flex flex-col px-5 min-w-[335px] 
      md:min-w-[624px]
      lg:min-w-[1020px]'
    >
      <BoardsHeader />
      <Suspense
        fallback={
          <div className='text-center p-8'>
            <div>게시글을 불러오는 중...</div>
            <div className='animate-pulse'>⏳</div>
          </div>
        }
      >
        <BoardsBest />
        <BoardsLists />
      </Suspense>
    </main>
  );
}
