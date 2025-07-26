'use client';
import { useCallback, useState } from 'react';
import BoardsSearchBar from './BoardsSearchBar';
import { renderBoardItem } from './BoardsList';
import BoardsOrderDropdown from './BoardsOrderDropdown';
import { ArticleResponse, OrderByType } from '@/api/article/getArticlesAPI';
import Pagination from '../../common/Pagination/Pagination';

const BoardsLists = () => {
  const [searchResults, setSearchResults] = useState<ArticleResponse[]>([]);
  const [orderBy, setOrderBy] = useState<OrderByType>('recent');

  const handleOrderChange = useCallback((value: OrderByType) => {
    setOrderBy(value);
  }, []);

  return (
    <>
      {/* 검색바와 정렬 드롭다운 */}
      <div
        className='flex gap-4 pt-10 mb-5
      md:pt-12'
      >
        {/* 검색바 */}
        <BoardsSearchBar
          placeholder='제목을 검색해 주세요'
          onSearchResults={setSearchResults}
          orderBy={orderBy}
        />
        {/* 드롭다운 컴포넌트 */}
        <BoardsOrderDropdown value={orderBy} onChange={handleOrderChange} />
      </div>

      {/* 테이블 헤더 추가 */}
      <div className='border-b-1 border-t-1 border-gray-200'>
        <div className='grid grid-cols-[64px_1fr_120px_64px_96px] gap-10 px-2 py-1.5 text-lg-semibold text-gray-400'>
          <p className='text-center'>번호</p>
          <p className='text-center'>제목</p>
          <p className='text-center'>작성자</p>
          <p className='text-center'>좋아요</p>
          <p className='text-center'>날짜</p>
        </div>
      </div>
      {/* Pagination 컴포넌트 사용 */}
      <Pagination
        data={searchResults}
        renderItem={renderBoardItem}
        pageSize={10}
        emptyMessage='검색 결과가 없습니다.'
        itemSpacing={false} // 게시판은 간격 없음
        listHeight={{
          mobile: 'h-[500px]',
          desktop: 'md:h-[500px]',
        }}
      />
    </>
  );
};

export default BoardsLists;
