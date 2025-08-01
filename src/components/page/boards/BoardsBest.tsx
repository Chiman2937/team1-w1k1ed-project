'use client';
import { useEffect, useState } from 'react';
import BoardsBestCard from './BoardsBestCard';
import { getArticlesAPI, ArticleResponse } from '@/api/article/getArticlesAPI';
import { useRouter } from 'next/navigation';

function BoardsBest() {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        setLoading(true);
        const bestArticles = await getArticlesAPI('', 'like', undefined, 4);
        setArticles(bestArticles);
      } catch (error) {
        console.error('Failed to fetch best articles:', error);
        router.push('/error');
      } finally {
        setLoading(false);
      }
    };
    fetchBestArticles();
  }, [router]);

  if (loading) {
    return (
      <div className='w-full h-48 flex items-center justify-center'>
        <div className='animate-pulse text-gray-500'>로딩 중...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className='w-full h-48 flex items-center justify-center'>
        <div className='text-gray-500'>게시글이 없어요!</div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* 모바일: 수평 스크롤 */}
      <div className='block md:hidden'>
        <div className='flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x snap-mandatory'>
          {articles.map((article) => (
            <div key={article.id} className='flex-shrink-0 snap-start'>
              <BoardsBestCard article={article} />
            </div>
          ))}
        </div>
      </div>
      {/* md 이상: 그리드 */}
      <div className='hidden md:grid md:grid-cols-2 md:gap-4 lg:flex lg:justify-between lg:gap-4'>
        {articles.map((article) => (
          <BoardsBestCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default BoardsBest;
