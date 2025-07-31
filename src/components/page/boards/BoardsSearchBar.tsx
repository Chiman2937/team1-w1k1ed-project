'use client';
import { ArticleResponse, getArticlesAPI, OrderByType } from '@/api/article/getArticlesAPI';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const BoardsSearchBar = ({
  placeholder,
  onSearchResults,
  onSearchTerm,
  orderBy = 'recent', // 기본값
}: {
  placeholder: string;
  onSearchResults?: (data: ArticleResponse[]) => void;
  onSearchTerm?: (term: string) => void;
  orderBy?: OrderByType; // 새로 추가된 prop
}) => {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState<string>('');
  const abortControllerRef = useRef<AbortController | undefined>(undefined);
  const router = useRouter();

  // API 호출 함수
  const searchAPI = useCallback(
    async (keyword: string, sortBy: OrderByType = 'recent') => {
      try {
        const trimmedKeyword = keyword.trim();
        onSearchTerm?.(trimmedKeyword || '');

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        // 항상 전체 데이터 가져오기
        const allArticles = await getArticlesAPI(
          '', // 빈 검색어로 전체 데이터 요청
          sortBy,
          abortControllerRef.current.signal,
        );

        let articles: ArticleResponse[] = [];

        if (trimmedKeyword) {
          // 검색어가 있으면 프론트엔드에서 필터링
          console.log(`검색어 "${trimmedKeyword}"로 필터링 시작`);

          articles = allArticles.filter((article) => {
            const title = article.title.toLowerCase();
            const search = trimmedKeyword.toLowerCase();

            // 제목에 검색어가 포함되어 있는지 확인 (영문/한글 구분 없이)
            return title.includes(search);
          });

          console.log(`필터링 결과: 전체 ${allArticles.length}개 중 ${articles.length}개 매칭`);

          // 검색 타입 로깅 (디버깅용)
          const isEnglishOnly = /^[a-zA-Z\s]+$/.test(trimmedKeyword);
          const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(trimmedKeyword);
          console.log('검색 타입:', isEnglishOnly ? '영문' : hasKorean ? '한글' : '혼합/특수문자');
        } else {
          // 검색어가 없으면 전체 목록
          console.log('전체 목록 표시');
          articles = allArticles;
        }

        onSearchResults?.(articles);
        console.log('최종 검색 결과:', articles);
        console.log('검색어:', trimmedKeyword);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('이전 요청이 취소되었습니다.');
          return;
        }
        console.error('API 호출 오류:', error);

        router.push('/error');
        // onSearchResults?.([]);
      }
    },
    [onSearchResults, onSearchTerm],
  );

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    searchAPI(searchTerm, orderBy);
  };

  // Enter 키 눌렀을 때 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    // 처음에 마운트시에 전체 목록 로드
    searchAPI('', orderBy);

    // 컴포넌트 언마운트 시 정리
    return () => {
      // API 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // 초기 로드만

  // orderBy가 변경되면 현재 검색어로 다시 검색
  useEffect(() => {
    searchAPI(searchTerm, orderBy);
  }, [orderBy, searchAPI]);

  return (
    <div className='flex gap-4 flex-1'>
      {/* Input 영역 */}
      <div className='relative flex flex-1'>
        <FiSearch
          size={20}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-grayscale-400 pointer-events-none'
        />
        <input
          className='block pl-10 pr-3 h-[45px] w-full text-lg-medium rounded-[10px] text-grayscale-500 bg-grayscale-100 focus:outline-primary-green-200 py-[9px]'
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* 검색 버튼 */}
      <button
        onClick={handleSearch}
        className='px-4 py-1.5 w-[80px] h-[45px] text-md-semibold bg-primary-green-200 text-grayscale-50 rounded-[10px] hover:bg-primary-green-300 hover:cursor-pointer'
      >
        검색
      </button>
    </div>
  );
};

export default BoardsSearchBar;
