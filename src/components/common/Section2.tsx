import Image from 'next/image';

export default function Section2() {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <main
        className='mx-auto
        w-[335px]
        md:w-[646px] 
        lg:w-[924px]'
      >
        <section className=' py-[100px] bg-gray-50 relative'>
          <div className='text-right my-[40px]'>
            <h3
              className='text-primary-green-200 font-nexon-gothic-bold 
              text-[10px]
              md:text-[20px]
              lg:text-[30px]'
            >
              SHARE
            </h3>
            <h2
              className='font-nexon-gothic-regular mt-[10px]
              text-[16px] mb-[216px] 
              md:text-[32px] md:mb-[387px]
              lg:text-[50px] lg:mb-[680px]'
            >
              내 위키 만들고
              <br />
              친구에게 공유해요
            </h2>
          </div>

          <div
            className='max-w-none flex absolute left-1/2 -translate-x-1/2
          gap-[10px] top-[300px] 
          md:gap-[20px] md:top-[400px] 
          lg:gap-[70px] lg:top-[500px]'
          >
            <div
              className='bg-grayscale-250 border border-none rounded-[10px]
              w-[76px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
            <Image
              src='/images/type=image7.svg'
              alt='공지 메가폰 아이콘'
              width={76}
              height={76}
              className=' bg-secondary-purple-50 border border-none rounded-[10px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
            <Image
              src='/images/type=image8.svg'
              alt='회사 로고'
              width={76}
              height={76}
              className=' bg-primary-green-150 border border-none rounded-[10px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
            <Image
              src='/images/type=image9.svg'
              alt='앱 업데이트 화면'
              width={76}
              height={76}
              className='bg-grayscale-250 border border-none rounded-[10px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
            <Image
              src='/images/type=image10.svg'
              alt='대화 말풍선'
              width={76}
              height={76}
              className='bg-grayscale-250 border border-none rounded-[10px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
            <div
              className='bg-grayscale-250 border border-none rounded-[10px] aspect-square
              md:w-[147px]
              lg:w-[360px]'
            />
          </div>
        </section>
      </main>
    </div>
  );
}
