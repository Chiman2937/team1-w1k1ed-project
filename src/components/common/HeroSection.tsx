import Image from 'next/image';
import Button from './Button';
import { motion, useAnimation, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Link from 'next/link';

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

const HeroSection = () => {
  // 메인 HeroSection의 애니메이션 컨트롤
  const mainControls = useAnimation();
  const [mainRef, mainInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (mainInView) {
      mainControls.start('visible');
    }
  }, [mainControls, mainInView]);

  // WRITE 섹션 (선택된 부분)의 독립적인 애니메이션 컨트롤
  const writeSectionControls = useAnimation();
  const [writeSectionRef, writeSectionInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (writeSectionInView) {
      writeSectionControls.start('visible');
    }
  }, [writeSectionControls, writeSectionInView]);

  return (
    <motion.div
      ref={mainRef} // 메인 HeroSection의 ref
      initial='hidden'
      animate={mainControls} // 메인 컨트롤 사용
      variants={containerVariants}
      className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'
    >
      <div
        className='mx-auto
          w-[335px]
          md:w-[646px]
          lg:w-[924px]'
      >
        <section className='relative py-[100px]'>
          <motion.div
            variants={itemVariants}
            className='absolute bottom-0 left-1/2 translate-x-[-50%] w-[500%] bg-grayscale-500 rounded-t-[100%] z-0
            h-[800px]
            md:h-[1200px]
            lg:h-[1500px]'
          />

          <motion.div variants={itemVariants} className='relative z-10'>
            <h1
              className='font-nexon-gothic-light relative z-10
              text-[40px]
              md:text-[60px]'
            >
              남들이 만드는 <br />
              <span
                className='font-nexon-gothic-bold
                text-[58px]
                md:text-[90px]'
              >
                나만의 위키
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className='relative z-10'>
            <Link href='/mypage'>
              <Button
                variant='landingGray'
                className='mx-[40px] rounded-[15px] transition font-pretendard font-bold
              px-[30px] py-[15px] text-[20px]
              md:font-[24px] md:text-[24px]'
              >
                위키 만들기
              </Button>
            </Link>

            <Image
              src='/images/type=image1.png'
              alt='사용자 온보딩 문서'
              width={498}
              height={590}
              className='mt-[44px] mx-auto
              w-[336px] h-[389px]
              md:w-[498px] md:h-[590px]'
            />
          </motion.div>

          <motion.div
            ref={writeSectionRef} // 독립적인 ref 연결
            initial='hidden' // 초기 상태는 hidden
            animate={writeSectionControls} // 독립적인 컨트롤 사용
            variants={containerVariants} // 이 컨테이너의 자식들을 위한 variants
            className='flex w-full
            gap-[10px] py-[100px] relative z-10
            md:gap-[20px] md:py-[153px]
            lg:gap-[40px] lg:py-[193px]'
          >
            {/* 이 div는 이제 writeSectionControls의 자식이므로 itemVariants를 그대로 유지 */}
            <motion.div variants={itemVariants} className='z-10 text-left flex flex-col'>
              <motion.h3
                variants={itemVariants}
                className='text-primary-green-200 font-nexon-gothic-bold
                text-[10px]
                md:text-[20px]
                lg:text-[30px]'
              >
                WRITE
              </motion.h3>

              <motion.h2
                variants={itemVariants}
                className='font-nexon-gothic-regular text-grayscale-50 mt-[10px] mb-[30px]
                text-[16px]
                md:text-[32px]
                lg:text-[50px]'
              >
                친구의 위키,
                <br />
                직접 작성해 봐요
              </motion.h2>

              <motion.div variants={itemVariants} className='relative z-10 w-full h-full'>
                <Image
                  src='/images/type=image2.png'
                  alt='키보드 타이핑'
                  fill
                  className='bg-primary-green-200 border border-none rounded-[10px]
                  object-cover'
                />
              </motion.div>
            </motion.div>

            {/* 이 이미지의 motion.div도 writeSectionControls의 자식이므로 itemVariants를 그대로 유지 */}
            <motion.div variants={itemVariants} className='relative z-10'>
              <Image
                src='/images/type=image3.png'
                alt='다크 테마 채팅 화면'
                width={520}
                height={681}
                unoptimized
                className='
                w-[192px] h-[250px]
                md:w-[365px] md:h-[479px]
                lg:w-[520px] lg:h-[681px]'
              />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default HeroSection;
