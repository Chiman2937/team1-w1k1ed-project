import Image from 'next/image';

const ViewSection = () => {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <main
        className='mx-auto
        w-[335px]
        md:w-[646px] 
        lg:w-[924px]'
      >
        <section className=' py-[100px]'>
          <div className='text-left'>
            <h3
              className='text-primary-green-200 font-nexon-gothic-bold text-[10px]
            md:text-[20px]
            lg:text-[30px]'
            >
              VIEW
            </h3>
            <h2
              className='font-nexon-gothic-regular mt-[10px] mb-[30px]
              text-[16px] 
              md:text-[32px]
              lg:text-[50px]'
            >
              친구들이 달아준
              <br />
              내용을 확인해 봐요
            </h2>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <Image
              src='/images/type=image4.svg'
              alt='밝은 테마 채팅 화면'
              width={335}
              height={102}
              className='border border-none rounded-[10px]
                md:w-[648px] md:h-[196px]
                lg:w-[924px] lg:h-[280px]'
            />
            <div
              className='flex 
              w-[335px] h-[102px] gap-[10px] 
              md:w-[648px] md:h-[196px] md:gap-[22px]
              lg:w-[924px] lg:h-[280px] lg:gap-[40px]'
            >
              <Image
                src='/images/type=image6.svg'
                alt='알림 종 아이콘'
                width={102}
                height={102}
                className='bg-secondary-purple-100 border border-none rounded-[10px] aspect-square
                md:w-[198px]
                lg:w-[280px]'
              />
              <Image
                src='/images/type=image5.svg'
                alt='FAQ 채팅 버블'
                width={223}
                height={102}
                className='border border-none rounded-[10px]
                md:w-[428px] md:h-[198px]
                lg:w-[604px] lg:h-[280px]'
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewSection;
