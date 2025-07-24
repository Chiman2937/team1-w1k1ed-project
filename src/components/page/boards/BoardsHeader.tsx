import Button from '@/components/common/Button';

const BoardsHeader = () => {
  return (
    <section className='w-full flex justify-between py-10 items-center'>
      <h1 className='text-grayscale-500 text-2xl-semibold'>베스트 게시글</h1>
      <Button>게시물 등록하기</Button>
    </section>
  );
};

export default BoardsHeader;
