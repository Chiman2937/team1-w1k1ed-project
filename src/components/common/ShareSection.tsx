// ShareSection.tsx
'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { motion, useMotionValue, useAnimationFrame, useAnimation, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

// 컨테이너와 아이템 variants 분리
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

const ShareSection = () => {
  const controls = useAnimation();
  // triggerOnce: true로 설정하여 한 번만 애니메이션이 실행
  // threshold: 0.2는 요소의 20%가 보일 때 애니메이션을 트리거
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]); // controls와 inView가 변경될 때마다 이 효과를 다시 실행

  const baseImageClass = `
    border border-none rounded-[10px] aspect-square shrink-0
    w-[76px] md:w-[147px] lg:w-[360px]
  `;

  const originalItems = [
    <Image
      key='image-7'
      src='/images/type=image7.png'
      alt='공지 메가폰 아이콘'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-secondary-purple-50')}
    />,
    <Image
      key='image-8'
      src='/images/type=image8.png'
      alt='회사 로고'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-primary-green-150')}
    />,
    <Image
      key='image-9'
      src='/images/type=image9.png'
      alt='앱 업데이트 화면'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-grayscale-250')}
    />,
    <Image
      key='image-10'
      src='/images/type=image10.png'
      alt='대화 말풍선'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-grayscale-250')}
    />,
    <Image
      key='image-13'
      src='/images/type=image13.png'
      alt='웃는 이모지'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-pink-100')}
    />,
    <Image
      key='image-14'
      src='/images/type=image14.png'
      alt='박수 환영'
      width={360}
      height={360}
      className={clsx(baseImageClass, 'bg-yellow-100')}
    />,
  ];

  const itemsForScroll = [...originalItems, ...originalItems];

  const xTranslation = useMotionValue(0);

  // 스크롤 속도 (픽셀/초) - 원하는 속도로 조절
  const scrollVelocity = -50;

  const contentWidthRef = useRef<HTMLDivElement>(null);
  const [fullContentWidth, setFullContentWidth] = useState(0);

  // 컨테이너 너비 측정 로직
  useEffect(() => {
    const calculateWidth = () => {
      if (contentWidthRef.current) {
        // 모든 자식 요소의 너비와 gap을 합산하여 정확한 한 세트의 너비를 계산
        // 여기서는 간단하게 `scrollWidth`를 이용한 후 2로 나누는 방법으로 계산
        // `itemsForScroll`의 `scrollWidth`는 복제된 두 세트의 총 너비이므로, 원본 한 세트의 너비는 절반이 됩니다.
        setFullContentWidth(contentWidthRef.current.scrollWidth / 2);
      }
    };

    calculateWidth(); // 초기 로드 시 너비 계산

    // 리사이즈 이벤트 리스너 추가 (반응형 대응)
    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  useAnimationFrame((t, delta) => {
    // 뷰포트에 들어왔을 때만 애니메이션 실행
    if (!inView || !fullContentWidth) return;

    let currentX = xTranslation.get();

    currentX += (scrollVelocity * delta) / 1000;

    if (currentX < -fullContentWidth) {
      currentX += fullContentWidth;
    }

    xTranslation.set(currentX);
  });

  return (
    <motion.div
      ref={ref} // useInView 훅과 연결하여 뷰포트 진입을 감지
      initial='hidden' // 초기 상태는 hidden (opacity: 0, y: 30)
      animate={controls} // useAnimation 훅으로 제어되는 애니메이션
      variants={containerVariants}
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

          <motion.div
            variants={itemVariants}
            className='flex overflow-hidden 
            w-full items-center'
          >
            <motion.div
              style={{ x: xTranslation }}
              ref={contentWidthRef}
              className='flex flex-nowrap gap-[10px] md:gap-[20px] lg:gap-[70px] whitespace-nowrap'
            >
              {itemsForScroll.map((item, index) => (
                // staggerChildren을 적용하려면 여기에 motion.div를 사용해야 함
                // 현재는 useAnimationFrame으로 전체를 움직이므로 itemVariants는 텍스트에만 적용
                <span key={`scroll-item-${index}`} className='shrink-0'>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

export default ShareSection;
