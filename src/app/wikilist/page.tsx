'use client';

import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/common/SearchBar';
import { useState } from 'react';
import WikiListCard from '../../components/page/wikilist/WikiListCard';
import SearchResultSummary from '../../components/page/wikilist/SearchResultSummary';
import Image from 'next/image';
import NoResultImg from '@/assets/images/search-no-result.png';

// TODO:재사용 가능하니까 따로 분리
export interface Profile {
  id: number;
  code: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: Date | string;
  name: string;
}

export default function WikilistPage() {
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searchTerm, setCurrentSearchTerm] = useState('');

  return (
    <main
      className='flex flex-col justify-center gap-10 min-w-[334px]
  md:min-w-[696px] md:gap-[100px] 
  lg:min-w-[859px] lg:gap-[54px]
    '
    >
      <header
        className='flex flex-col gap-4
      md:gap-5
      lg:gap-4
      '
      >
        <SearchBar
          placeholder='검색어 입력해주세요'
          onSearchResults={setSearchResults}
          onSearchTerm={setCurrentSearchTerm}
        />
        <SearchResultSummary searchTerm={searchTerm} resultCount={searchResults.length} />
      </header>
      {searchResults.length === 0 && searchTerm ? (
        // 검색했지만 결과가 없는 경우 TODO:컴포넌트화
        <div
          className='flex flex-col justify-center items-center gap-[35px] text-grayscale-400 py-8
        md:gap-8
        '
        >
          <p className='text-lg-regular'>
            &apos;{searchTerm}&apos;과(와) 일치하는 검색 결과가 없어요
          </p>
          <Image
            src={NoResultImg}
            alt='탐색기 이미지'
            className='h-[108px] w-[108px]
          md:h-36 md:w-36
          '
          />
        </div>
      ) : (
        <Pagination
          className='gap-2.5'
          data={searchResults}
          pageSize={3}
          maxVisiblePages={5}
          renderItem={WikiListCard}
          emptyMessage=''
        />
      )}
    </main>
  );
}
