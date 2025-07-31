'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import { dateFormater } from '@/utils/date';
import { ArticleResponse } from '@/api/article/getArticlesAPI';
import BoardsNoImg from '@/assets/images/boards-best-noImg.png';
// import { useState } from 'react';

interface BoardsBestCardProps {
  article: ArticleResponse;
}

const BoardsBestCard = ({ article }: BoardsBestCardProps) => {
  // const [imgSrc, setImgSrc] = useState(BoardsNoImg);

  // useEffect(() => {
  //   const img = new Image();
  //   img.onload = () => {
  //     console.log('이미지 로드 성공');
  //   };

  //   img.onerror = () => {
  //     console.log('이미지 로드 실패');
  //   };

  //   img.src = article.image;
  // }, []);

  const image =
    article.image === 'https://example.com/...' || article.image === '' || !article.image
      ? BoardsNoImg
      : article.image;

  return (
    <Link
      href={`/boards/${article.id}`}
      className='flex-1 rounded-[10px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-grascale-50 h-[225px] md:h-[220px]'
    >
      {/* 이미지 영역 */}
      <div className='w-full h-[130px] relative'>
        <Image
          src={image}
          alt={article.title}
          className='object-cover'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
          // onError={() => setImgSrc(BoardsNoImg)}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className='p-4 h-[80px] flex flex-col justify-between'>
        <h3 className='text-sm font-medium text-gray-900 line-clamp-2 mb-2'>{article.title}</h3>
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-4'>
            <span>{article.writer.name}</span>
            <span>{dateFormater(article.updatedAt)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <CiHeart size={15} />
            <span>{article.likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoardsBestCard;
