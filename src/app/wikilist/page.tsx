'use client';

import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/common/SearchBar';
import WikiListCard from '@/components/page/wikilist/WikiListCard';
import SearchResultSummary from '@/components/page/wikilist/SearchResultSummary';
import NoResultFallback from '@/components/page/wikilist/NoResultFallback';

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

export default function WikiListPage() {
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searchTerm, setCurrentSearchTerm] = useState('');

  return (
    <main
      className='flex flex-col gap-10 min-w-[334px]
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
      <Pagination
        className='gap-2.5'
        data={searchResults}
        pageSize={3}
        maxVisiblePages={5}
        renderItem={WikiListCard}
        emptyMessage={<NoResultFallback searchTerm={searchTerm} />}
      />
    </main>
  );
}
