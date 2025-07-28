import Link from 'next/link';
import { dateFormater } from '@/utils/date';
import { ArticleResponse } from '@/api/article/getArticlesAPI';

// 개별 게시글 아이템 컴포넌트
interface BoardsListItemProps {
  result: ArticleResponse;
  index: number;
  totalCount: number;
}

const BoardsListItem = ({ result, index, totalCount }: BoardsListItemProps) => {
  // 역순 번호 계산: 전체 개수 - 현재 인덱스
  const displayNumber = totalCount - index;

  return (
    <Link
      href={`/boards/${result.id}`}
      className='grid grid-cols-[64px_1fr_120px_64px_96px] gap-10 px-2 h-12 items-center border-b text-base text-gray-500 border-gray-200 hover:bg-gray-50 transition-colors'
    >
      <p className='text-center'>{displayNumber}</p>
      <p className='text-center truncate'>{result.title}</p>
      <p className='text-center'>{result.writer.name}</p>
      <p className='text-center'>{result.likeCount}</p>
      <p className='text-center'>{dateFormater(result.updatedAt)}</p>
    </Link>
  );
};

// Pagination renderItem으로 사용할 함수
export const renderBoardItem = (result: ArticleResponse, index: number, totalCount?: number) => {
  return <BoardsListItem result={result} index={index} totalCount={totalCount || 0} />;
};

export default BoardsListItem;
