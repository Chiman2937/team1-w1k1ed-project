'use client';

import { getProfilesAPI, Profile } from '@/api/profile/getProfilesAPI';
import axios from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

const WikiListSearchBar = ({
  placeholder,
  onSearchResults,
  onSearchTerm,
}: {
  placeholder: string;
  onSearchResults?: (data: Profile[]) => void;
  onSearchTerm?: (term: string) => void;
}) => {
  // 미리 정의해 놓기(Lazy Initialization)
  const searchTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | undefined>(undefined);

  // API 호출 함수
  const searchAPI = useCallback(async (keyword: string) => {
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

      const results = await getProfilesAPI(trimmedKeyword, abortControllerRef.current.signal);
      onSearchResults?.(results);
      console.log('검색 결과:', results);
    } catch (error) {
      if (axios.isCancel(error)) {
        // TODO:개발끝나면 지우기
        console.log('이전 요청이 취소되었습니다.');
        return;
      }
      console.error('API 호출 오류:', error);
      onSearchResults?.([]);
    }
  }, []);

  // 디바운싱 + 타이머 관리 함수
  const handleSearchWithDebounce = (term: string) => {
    // 이전 타이머가 존재한다면 예약 clear
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    // 새 타이머 예약 set
    searchTimerRef.current = setTimeout(() => {
      searchAPI(term);
    }, 300);
  };

  useEffect(() => {
    // 처음에 마운트시에 전체 목록 로드
    searchAPI('');

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 타이머 정리
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      // API 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <FiSearch
        size={20}
        className='absolute left-3 top-1/2 -translate-y-1/2  text-grayscale-400 pointer-events-none'
      />
      <input
        className=' block pl-10 h-[45px] w-full rounded-[10px] text-grayscale-500 bg-grayscale-100 focus:outline-primary-green-200 py-[9px] px-3'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearchWithDebounce(e.target.value);
        }}
      />
    </div>
  );
};
export default WikiListSearchBar;
