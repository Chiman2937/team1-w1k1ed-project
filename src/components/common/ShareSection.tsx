'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { motion, useMotionValue, useAnimationFrame, useAnimation, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

// 컨테이너와 아이템 variants 분리
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.5 } },
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const baseImageClass = `
    border border-none rounded-[10px] aspect-square shrink-0
    w-[76px] md:w-[147px] lg:w-[360px]
    shadow-2xl
    `;

  const originalItems = [
    { src: '/images/type=image7.png', alt: '공지 메가폰 아이콘', bg: 'bg-secondary-purple-50' },
    { src: '/images/type=image8.png', alt: '회사 로고', bg: 'bg-primary-green-150' },
    { src: '/images/type=image9.png', alt: '앱 업데이트 화면', bg: 'bg-grayscale-250' },
    { src: '/images/type=image10.png', alt: '대화 말풍선', bg: 'bg-grayscale-250' },
  ];

  // 여러 세트 반복해서 렌더 (기본적으로 4세트)
  const repeatedItems = Array(4).fill(originalItems).flat();

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const xTranslation = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);

  const scrollVelocity = -50;

  // 한 세트의 실제 너비 측정
  const measureSetWidth = () => {
    if (!scrollRef.current) return;
    const fullWidth = scrollRef.current.scrollWidth;
    const setCount = repeatedItems.length / originalItems.length;
    setSetWidth(fullWidth / setCount);
    xTranslation.set(0);
  };

  useEffect(() => {
    measureSetWidth();
    const resizeObserver = new ResizeObserver(measureSetWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 무한 스크롤 애니메이션
  useAnimationFrame((t, delta) => {
    if (!inView || !setWidth) return;

    let currentX = xTranslation.get();
    currentX += (scrollVelocity * delta) / 1000;

    if (currentX <= -setWidth * 2) {
      currentX += setWidth;
    }

    xTranslation.set(currentX);
  });

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={containerVariants}
      className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'
    >
      <main className='mx-auto w-full'>
        <section
          ref={containerRef}
          className='bg-gray-50 flex flex-col justify-center items-center py-[100px] md:py-[160px] lg:py-[200px]'
        >
          <motion.div
            variants={itemVariants}
            className='text-right mb-[40px] w-[335px] md:mb-[80px] md:w-[646px] lg:mb-[120px] lg:w-[924px]'
          >
            <h3 className='text-primary-green-200 font-nexon-gothic-bold text-[10px] md:text-[20px] lg:text-[30px]'>
              SHARE
            </h3>
            <h2 className='font-nexon-gothic-regular mt-[10px] text-[16px] md:text-[32px] lg:text-[50px]'>
              내 위키 만들고
              <br />
              친구에게 공유해요
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className='flex overflow-hidden w-full items-center'>
            <motion.div
              ref={scrollRef}
              style={{ x: xTranslation }}
              className='flex flex-nowrap gap-[10px] md:gap-[20px] lg:gap-[70px] whitespace-nowrap my-10'
            >
              {repeatedItems.map((item, idx) => (
                <span key={`scroll-item-${idx}`} className='shrink-0'>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={360}
                    height={360}
                    className={clsx(baseImageClass, item.bg)}
                  />
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
