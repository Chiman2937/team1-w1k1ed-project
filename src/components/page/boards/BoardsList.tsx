import Link from 'next/link';
import { dateFormater } from '@/utils/date';
import { ArticleResponse } from '@/api/article/getArticlesAPI';
import { CiHeart } from 'react-icons/ci';

// 개별 게시글 아이템 컴포넌트
interface BoardsListItemProps {
  result: ArticleResponse;
}

const BoardsListItem = ({ result }: BoardsListItemProps) => {
  return (
    <Link
      href={`/boards/${result.id}`}
      className='group block border-b border-gray-200 hover:bg-grayscale-100 transition-colors'
    >
      {/* 모바일 레이아웃 */}
      <div className='md:hidden my-1'>
        <h3 className='text-base font-lg-regular text-grayscale-500 mb-2 line-clamp-2 group-hover:underline'>
          {result.title}
        </h3>
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-3 text-gray-500'>
            <span>{result.writer.name}</span>
            <span>{dateFormater(result.updatedAt)}</span>
          </div>
          <div className='flex items-center gap-1 text-gray-500'>
            <CiHeart size={16} />
            <span>{result.likeCount}</span>
          </div>
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className='hidden md:grid grid-cols-[64px_1fr_100px_64px_96px] gap-10 px-2 h-12 items-center text-base text-gray-500'>
        <p className='text-center'>{result.id}</p>
        <p className='text-left truncate group-hover:underline'>{result.title}</p>
        <p className='text-center'>{result.writer.name}</p>
        <p className='text-center'>{result.likeCount}</p>
        <p className='text-center'>{dateFormater(result.updatedAt)}</p>
      </div>
    </Link>
  );
};

// Pagination renderItem으로 사용할 함수
export const renderBoardItem = (result: ArticleResponse) => {
  return <BoardsListItem result={result} />;
};

export default BoardsListItem;
