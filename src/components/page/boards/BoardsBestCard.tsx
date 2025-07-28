import Link from 'next/link';
import { Article } from './BoardsBest';
import { CiHeart } from 'react-icons/ci';
import { dateFormater } from '@/utils/date';
interface BoardsBestCardProps {
  article: Article;
}
const BoardsBestCard = ({ article }: BoardsBestCardProps) => {
  return (
    <Link
      href={`/boards/${article.id}`}
      className='flex-1 rounded-[10px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-grascale-50 h-[225px]
     md:h-[220px]
    '
    >
      {/* 이미지 영역 */}
      {article.image ? (
        <div className='w-full h-[130px] bg-gray-100'>
          <img src={article.image} alt={article.title} className='w-full h-full object-cover' />
        </div>
      ) : (
        <div className='w-full h-[130px] bg-primary-green-200'></div>
      )}

      {/* 텍스트 영역 */}
      <div className='p-4 h-[80px] flex flex-col justify-between'>
        <h3 className='text-sm font-medium text-gray-900 line-clamp-2 mb-2'>{article.title}</h3>

        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-4'>
            <span>{article.writer.name}</span>
            <span>{dateFormater(article.updatedAt)}</span>
          </div>
          <div className='flex items-center  gap-1'>
            <CiHeart size={15} />
            <span>{article.likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BoardsBestCard;
