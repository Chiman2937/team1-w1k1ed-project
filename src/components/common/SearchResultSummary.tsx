interface SearchResultSummaryProps {
  // 검색어
  searchTerm: string;
  // 검색 결과수
  resultCount: number;
  // 단위
  unit?: string; // "명", "건" 등
  // 추가 스타일링
  className?: string;
}

const SearchResultSummary = ({
  searchTerm,
  resultCount,
  unit = '명',
  className = '',
}: SearchResultSummaryProps) => {
  // 검색어가 없거나 결과가 없으면 표시하지 않음
  const shouldShow = searchTerm && resultCount > 0;

  return (
    <p
      className={`text-grayscale-400 text-lg-regular ${className} ${
        shouldShow ? 'visible' : 'invisible'
      }`}
    >
      &quot;<span>{searchTerm}</span>&quot;님을 총{' '}
      <span className='text-primary-green-200'>{resultCount}</span>
      {unit} 찾았습니다.
    </p>
  );
};

export default SearchResultSummary;
