export default function Section4() {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <section className='flex flex-col gap-[40px] bg-grayscale-500 text-center text-white px-[31px] py-[100px]'>
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
          <button
            className='mx-[40px] my-[40px] px-[20px] py-[15px] rounded-[15px]
            font-pretendard font-semibold transition cursor-pointer
            bg-white text-grayscale-500 
            text-[20px]
            md:text-[24px]'
          >
            지금 시작하기
          </button>
        </div>
      </section>
    </div>
  );
}
