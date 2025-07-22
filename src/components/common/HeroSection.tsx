import Image from 'next/image';
import Button from './Button';

const HeroSection = () => {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <main
        className='mx-auto
        w-[335px]
        md:w-[646px] 
        lg:w-[924px]'
      >
        <section className='relative py-[100px]'>
          <h1
            className='font-nexon-gothic-light relative z-10
          text-[40px]
          md:text-[60px]'
          >
            남들이 만드는 <br />
            <span
              className='font-nexon-gothic-bold 
            text-[58px]
            md:text-[90px]
            '
            >
              나만의 위키
            </span>
          </h1>
          <div className='relative z-10'>
            <Button
              variant='landingGray'
              className='mx-[40px] py-[15px] rounded-[15px] font-pretendard  transition
              font-[20px]
              md:font-[24px]'
            >
              위키 만들기
            </Button>

            <Image
              src='/images/type=image1.png'
              alt='사용자 온보딩 문서'
              width={336}
              height={389}
              className='my-[44px] mx-auto
            w-[336px] h-[389px]
            md:w-[498px] md:h-[590px]'
            />
          </div>
          <div
            className='flex w-full 
            gap-[10px] py-[100px]
            md:gap-[20px] md:py-[153px]
            lg:gap-[40px] lg:py-[193px]
            '
          >
            <div className='z-10 text-left '>
              <h3
                className='text-primary-green-200 font-nexon-gothic-bold
              text-[10px] 
              md:text-[20px]
              lg:text-[30px]'
              >
                WRITE
              </h3>
              <h2
                className='font-nexon-gothic-regular text-grayscale-50 mt-[10px] mb-[30px] 
              text-[16px] 
              md:text-[32px]
              lg:text-[50px]'
              >
                친구의 위키,
                <br />
                직접 작성해 봐요
              </h2>

              <Image
                src='/images/type=image2.png'
                alt='키보드 타이핑'
                width={113}
                height={162}
                className='z-10 bg-primary-green-200 border border-none rounded-[10px]
                md:w-[262px] md:h-[322px]
                lg:w-[364px] lg:h-[450px]'
              />
            </div>
            <Image
              src='/images/type=image3.png'
              alt='다크 테마 채팅 화면'
              width={192}
              height={250}
              className='z-10
              md:w-[365px] md:h-[479px]
              lg:w-[520px] lg:h-[681px]'
            />
          </div>
          <div
            className='absolute bottom-0 left-1/2 translate-x-[-50%]  w-[500%] bg-grayscale-500 rounded-t-[100%] z-0
          h-[800px]
          md:h-[1200px]
          lg:h-[1500px]'
          />
        </section>
      </main>
    </div>
  );
};

export default HeroSection;
