'use client';

import PaginationButton from '@/components/page/wikilist/PaginationButton';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import { useState, useEffect, ReactNode } from 'react';

interface PaginationProps<T> {
  // 총 데이터
  data: T[];
  // 한 페이지에 보여줄 데이터 갯수
  pageSize?: number;
  // 한 번에 보여줄 페이지 갯수
  maxVisiblePages?: number;
  // 보여줄 데이터의 형식
  renderItem: (item: T, index: number) => React.ReactNode;
  // 데이터가 없을 때 보여줄 것
  emptyMessage?: ReactNode;
  // 추가 스타일링
  className?: string;
}

function Pagination<T>({
  data,
  pageSize = 3,
  maxVisiblePages = 5,
  renderItem,
  emptyMessage = '데이터가 없습니다.',
  className = '',
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // 데이터가 변경되면 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // 기본 계산
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  // 현재 페이지가 총 페이지를 넘으면 조정
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // 그룹 기반 페이지네이션
  const groupStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const groupEnd = Math.min(groupStart + maxVisiblePages - 1, totalPages);

  // for 루프로 페이지 배열 생성
  const pages = [];
  for (let i = groupStart; i <= groupEnd; i++) {
    pages.push(i);
  }

  // 이전/다음 그룹 핸들러
  const handlePrevGroup = () => {
    const prevPage = Math.max(groupStart - 1, 1);
    setCurrentPage(prevPage);
  };

  const handleNextGroup = () => {
    const nextPage = Math.min(groupEnd + 1, totalPages);
    setCurrentPage(nextPage);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 데이터가 없을 경우
  if (data.length === 0) {
    return <div className={`text-center text-gray-500 py-8 ${className}`}>{emptyMessage}</div>;
  }

  return (
    <div className={className}>
      {/* 현재 페이지 데이터 렌더링 */}
      <div className='space-y-4 mb-6'>
        {currentData.map((item, index) => (
          <div key={startIndex + index}>{renderItem(item, startIndex + index)}</div>
        ))}
      </div>

      {/* 페이지가 1개보다 많을 때만 페이지네이션 표시 */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          {/* 이전 그룹 버튼 */}
          <PaginationButton
            variant='navigation'
            disabled={groupStart === 1}
            onClick={handlePrevGroup}
          >
            <FaAngleLeft />
          </PaginationButton>

          {/* 페이지 번호들 */}
          {pages.map((page) => (
            <PaginationButton
              key={page}
              variant='page'
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationButton>
          ))}

          {/* 다음 그룹 버튼 */}
          <PaginationButton
            variant='navigation'
            disabled={groupEnd === totalPages}
            onClick={handleNextGroup}
          >
            <FaAngleRight />
          </PaginationButton>
          {/* 페이지 정보 (확인용 TODO:개발 끝나면 지우기) */}
          {/* <div className='ml-4 text-sm text-gray-600'>
            {currentPage} / {totalPages} 페이지 (총 {data.length}개)
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Pagination;
