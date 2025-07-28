const BoardsListsHeader = () => {
  return (
    <div className='border-b-1 border-t-1 border-gray-200'>
      <div className='grid grid-cols-[64px_1fr_120px_64px_96px] gap-10 px-2 py-1.5 text-lg-semibold text-gray-400'>
        <p className='text-center'>번호</p>
        <p className='text-center'>제목</p>
        <p className='text-center'>작성자</p>
        <p className='text-center'>좋아요</p>
        <p className='text-center'>날짜</p>
      </div>
    </div>
  );
};

export default BoardsListsHeader;
