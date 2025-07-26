'use client';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

// TODO: 재사용 가능하게 분리하기
export interface ArticleWriterResponse {
  name: string;
  id: number;
}

export interface ArticleResponse {
  createdAt: Date | string;
  id: number;
  image: string;
  likeCount: number;
  title: string;
  updatedAt: Date | string;
  writer: ArticleWriterResponse;
}

type OrderByType = 'recent' | 'like';

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

  // API 호출 함수
  const searchAPI = useCallback(
    async (keyword: string, sortBy: OrderByType = 'recent') => {
      try {
        // 받은 검색어의공백 제거함
        const trimmedKeyword = keyword.trim();
        // 입력한 검색어를 부모에게 일단 전달 (검색 시작할 때)
        onSearchTerm?.(trimmedKeyword || '');

        // 이전의 요청이 존재하고 있다면 취소
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // 새로운 AbortController 생성
        abortControllerRef.current = new AbortController();

        // TODO: 하드코딩을 상수로 변경하기
        const params = {
          page: 1,
          pageSize: 500,
          orderBy: sortBy, // 동적으로 변경
          ...(trimmedKeyword && { keyword: trimmedKeyword }), // name에서 keyword로 변경
        };

        // TODO: API호출 함수는 재사용 가능하게 분리하기
        const response = await axios.get('https://wikied-api.vercel.app/6-16/articles', {
          params,
          signal: abortControllerRef.current.signal,
        });

        // 가져온 데이터
        const data = response.data;
        // 검색어를 API파라미터의 keyword에 입력해서 가져온 데이터를 부모에게 넘겨주기
        onSearchResults?.(data.list || []);

        // TODO:개발끝나면 지우기
        console.log('검색 결과:', data.list);
        console.log('정렬 기준:', sortBy);
        console.log('검색어:', trimmedKeyword);
      } catch (error) {
        if (axios.isCancel(error)) {
          // TODO:개발끝나면 지우기
          console.log('이전 요청이 취소되었습니다.');
          return;
        }
        console.error('API 호출 오류:', error);
        onSearchResults?.([]);
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
