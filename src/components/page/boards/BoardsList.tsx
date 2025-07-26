import Link from 'next/link';
import { ArticleResponse } from './BoardsSearchBar';
import { dateFormater } from '@/utils/date';

// 개별 게시글 아이템 컴포넌트
interface BoardsListItemProps {
  result: ArticleResponse;
  index: number;
}

const BoardsListItem = ({ result, index }: BoardsListItemProps) => {
  return (
    <Link
      href={`/boards/${result.id}`}
      className='grid grid-cols-[64px_1fr_80px_64px_96px] gap-10 px-2 h-12 items-center border-b text-base text-gray-500 border-gray-200 hover:bg-gray-50 transition-colors'
    >
      <p className='text-center'>{index + 1}</p>
      <p className='text-center truncate'>{result.title}</p>
      <p className='text-center'>{result.writer.name}</p>
      <p className='text-center'>{result.likeCount}</p>
      <p className='text-center'>{dateFormater(result.updatedAt)}</p>
    </Link>
  );
};

// Pagination renderItem으로 사용할 함수
export const renderBoardItem = (result: ArticleResponse, index: number) => {
  return <BoardsListItem result={result} index={index} />;
};

export default BoardsListItem;
