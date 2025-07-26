'use client';
import { useCallback, useState, memo, useRef, useEffect } from 'react';
import BoardsSearchBar, { ArticleResponse } from './BoardsSearchBar';
import { renderBoardItem } from './BoardsList';
import clsx from 'clsx';
import { HiCheck } from 'react-icons/hi2';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import BoardsPagination from './BoardsPagination';

type OrderByType = 'recent' | 'like';
const ORDER_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'like', label: '좋아요순' },
] as const;

// 심플한 커스텀 드롭다운
const SimpleOrderDropdown = memo(
  ({ value, onChange }: { value: OrderByType; onChange: (value: OrderByType) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = ORDER_OPTIONS.find((opt) => opt.value === value) || ORDER_OPTIONS[0];

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleSelect = useCallback(
      (optionValue: OrderByType) => {
        onChange(optionValue);
        setIsOpen(false);
      },
      [onChange],
    );

    return (
      <div ref={dropdownRef} className='relative'>
        <button
          type='button'
          onClick={handleToggle}
          className={clsx(
            'relative', // 👈 relative 추가
            'flex items-center justify-between',
            'px-5 py-2.5 w-[140px] h-[45px]',
            'text-md-regular text-grayscale-500',
            'bg-grayscale-100 rounded-[10px]',
            'border border-transparent',
            'hover:bg-grayscale-200 transition-colors',
            'focus:outline-none',
            isOpen && 'border-primary-green-200 bg-white',
          )}
          style={{ cursor: 'pointer' }}
        >
          <span className='pointer-events-none'>{selectedOption.label}</span>{' '}
          {/* 👈 pointer-events-none 추가 */}
          {isOpen ? (
            <IoMdArrowDropup className='size-5 fill-grayscale-400 pointer-events-none' />
          ) : (
            <IoMdArrowDropdown className='size-5 fill-grayscale-400 pointer-events-none' />
          )}
        </button>

        {isOpen && (
          <div
            className='absolute right-0 mt-2 w-[120px] bg-white rounded-[10px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)] py-2 px-2 z-50' // 👈 z-50으로 증가
          >
            {ORDER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  'w-full relative',
                  'px-4 py-3 rounded-[8px]',
                  'text-md-regular text-left',
                  'transition-all duration-150',
                  'flex items-center justify-between',
                  'hover:bg-primary-green-50',
                  option.value === value && 'text-primary-green-200 font-semibold',
                  option.value !== value && 'text-grayscale-500',
                )}
                style={{ cursor: 'pointer' }}
              >
                <span className='pointer-events-none'>{option.label}</span>{' '}
                {/* 👈 pointer-events-none 추가 */}
                {option.value === value && (
                  <HiCheck className='size-4 text-primary-green-200 pointer-events-none' />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SimpleOrderDropdown.displayName = 'SimpleOrderDropdown';

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
        <BoardsSearchBar
          placeholder='제목을 검색해 주세요'
          onSearchResults={setSearchResults}
          orderBy={orderBy}
        />

        {/* 분리된 드롭다운 컴포넌트 */}
        <SimpleOrderDropdown value={orderBy} onChange={handleOrderChange} />
      </div>

      {/* 테이블 헤더 추가 */}
      <div className='border-b-1 border-t-1 border-gray-200'>
        <div className='grid grid-cols-[64px_1fr_80px_64px_96px] gap-10 px-2 py-1.5 text-lg-semibold text-gray-400'>
          <p className='text-center'>번호</p>
          <p className='text-center'>제목</p>
          <p className='text-center'>작성자</p>
          <p className='text-center'>좋아요</p>
          <p className='text-center'>날짜</p>
        </div>
      </div>

      {/* Pagination 컴포넌트 사용 */}
      <BoardsPagination
        data={searchResults}
        renderItem={renderBoardItem}
        pageSize={10}
        emptyMessage='검색 결과가 없습니다.'
      />
    </>
  );
};

export default BoardsLists;
