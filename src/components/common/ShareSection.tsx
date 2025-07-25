import Image from 'next/image';
import { motion, useAnimation, easeOut } from 'framer-motion'; // Framer Motion 임포트
import { useInView } from 'react-intersection-observer'; // useInView 임포트
import { useEffect } from 'react'; // useEffect 임포트

// 컨테이너와 아이템 variants 분리
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const ShareSection = () => {
  const controls = useAnimation();
  // triggerOnce: true로 설정하여 한 번만 애니메이션이 실행
  // threshold: 0.3는 요소의 20%가 보일 때 애니메이션을 트리거
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]); // controls와 inView가 변경될 때마다 이 효과를 다시 실행

  // 스크롤될 아이템 목록을 배열로 관리
  const items = [
    <Image
      key='image-7'
      src='/images/type=image7.png'
      alt='공지 메가폰 아이콘'
      width={360}
      height={360}
      className='bg-secondary-purple-50 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
    <Image
      key='image-8'
      src='/images/type=image8.png'
      alt='회사 로고'
      width={360}
      height={360}
      className='bg-primary-green-150 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
    <Image
      key='image-9'
      src='/images/type=image9.png'
      alt='앱 업데이트 화면'
      width={360}
      height={360}
      className='bg-grayscale-250 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
    <Image
      key='image-10'
      src='/images/type=image10.png'
      alt='대화 말풍선'
      width={360}
      height={360}
      className='bg-grayscale-250 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
    <Image
      key='image-13'
      src='/images/type=image13.png'
      alt='웃는 이모지'
      width={360}
      height={360}
      className='bg-pink-100 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
    <Image
      key='image-14'
      src='/images/type=image14.png'
      alt='박수 환영'
      width={360}
      height={360}
      className='bg-yellow-100 border border-none rounded-[10px] aspect-square shrink-0
      md:w-[147px]
      lg:w-[360px]'
    />,
  ];

  return (
    // 전체 섹션을 motion.div로 감싸고 애니메이션 컨트롤을 연결
    <motion.div
      ref={ref} // useInView 훅과 연결하여 뷰포트 진입을 감지
      initial='hidden' // 초기 상태는 hidden (opacity: 0, y: 30)
      animate={controls} // useAnimation 훅으로 제어되는 애니메이션
      variants={containerVariants} // 자식 요소들의 staggerChildren을 포함하는 컨테이너 variants
      className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'
    >
      <main className='mx-auto w-full'>
        <section
          className='bg-gray-50 flex flex-col justify-center items-center
          py-[100px]
          md:py-[160px]
          lg:py-[200px]'
        >
          {/* 텍스트 블록에 itemVariants 적용 */}
          <motion.div
            variants={itemVariants}
            className='text-right
            mb-[40px] w-[335px]
            md:mb-[80px] md:w-[646px]
            lg:mb-[120px] lg:w-[924px]'
          >
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
              text-[16px]
              md:text-[32px]
              lg:text-[50px]'
            >
              내 위키 만들고
              <br />
              친구에게 공유해요
            </h2>
          </motion.div>

          {/* 스크롤되는 컨테이너 전체에 itemVariants 적용 */}
          <motion.div
            variants={itemVariants}
            className='flex overflow-hidden 
            w-full items-center'
          >
            <div
              className='flex flex-nowrap
              gap-[10px]
              md:gap-[20px]
              lg:gap-[70px]
              animate-scroll-left md:animate-scroll-left lg:animate-scroll-left
            '
            >
              {items.map((item, index) => (
                <span key={`first-${index}`} className='shrink-0'>
                  {item}
                </span>
              ))}
              {items.map((item, index) => (
                <span key={`second-${index}`} className='shrink-0'>
                  {item}
                </span>
              ))}
              {items.map((item, index) => (
                <span key={`third-${index}`} className='shrink-0'>
                  {item}
                </span>
              ))}
              {items.map((item, index) => (
                <span key={`third-${index}`} className='shrink-0'>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

export default ShareSection;
