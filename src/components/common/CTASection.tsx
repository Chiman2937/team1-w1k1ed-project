import Button from './Button';

const CTASection = () => {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <section
        className='flex flex-col gap-[40px] bg-grayscale-500 text-center text-white px-[31px] 
        py-[100px]
        md:py-[160px]
        lg:py-[200px]'
      >
        <div
          className=' m-auto
          w-[335px]
          md:w-[646px] 
          lg:w-[924px]'
        >
          <h1
            className='font-nexon-gothic-bold
          text-[30px]
          md:text-[60px]'
          >
            나만의 위키 만들어 보기
          </h1>
          <Button
            variant='landingWhite'
            className='mx-[40px] my-[40px] px-[30px] py-[15px] rounded-[15px]
            transition cursor-pointer
            text-[20px] font-pretendard font-semibold
            md:text-[24px]'
          >
            지금 시작하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
