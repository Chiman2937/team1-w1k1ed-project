import BoardsBestCard from './BoardsBestCard';

const BASE_URL = 'https://wikied-api.vercel.app';

export interface Writer {
  name: string;
  id: number;
}

export interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: string | null;
  title: string;
  id: number;
}

export interface ArticlesResponse {
  totalCount: number;
  list: Article[];
}

// 서버에서 실행되는 함수
async function getAllArticles(
  id: string,
  page: number,
  pageSize: number,
  orderBy: string,
  keyword?: string,
): Promise<ArticlesResponse> {
  const keywordParam = keyword ? `&keyword=${keyword}` : '';

  const res = await fetch(
    `${BASE_URL}/${id}/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}${keywordParam}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}

// 서버 컴포넌트 (async 가능)
async function BoardsBest() {
  // 서버에서 미리 데이터 가져오기
  const articles = await getAllArticles('6-16', 1, 4, 'like');

  return (
    <div className='w-full'>
      {/* 모바일: 수평 스크롤 */}
      <div className='block md:hidden'>
        <div className='flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x snap-mandatory'>
          {articles.list.map((article) => (
            <div key={article.id} className='flex-shrink-0 snap-start'>
              <BoardsBestCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* md 이상: 그리드 */}
      <div className='hidden md:grid md:grid-cols-2 md:gap-4 lg:flex lg:justify-between lg:gap-4'>
        {articles.list.map((article) => (
          <BoardsBestCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default BoardsBest;
