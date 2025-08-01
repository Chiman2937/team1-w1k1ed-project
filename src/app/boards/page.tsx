import BoardsBest from '@/components/page/boards/BoardsBest';
import BoardsHeader from '@/components/page/boards/BoardsHeader';
import BoardsLists from '@/components/page/boards/BoardsLists';
import LoadingOverlay from '@/components/common/LoadingOverlay';
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
          <div>
            <LoadingOverlay>페이지를 불러오고 있어요</LoadingOverlay>
          </div>
        }
      >
        <BoardsBest />
        <BoardsLists />
      </Suspense>
    </main>
  );
}
