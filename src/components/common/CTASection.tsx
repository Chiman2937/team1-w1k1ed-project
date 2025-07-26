import Button from './Button';
import { motion, useAnimation, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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

const CTASection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref} // useInView 훅과 연결하여 뷰포트 진입을 감지합니다.
      initial='hidden' // 초기 상태는 hidden (opacity: 0, y: 30)
      animate={controls} // useAnimation 훅으로 제어되는 애니메이션
      variants={containerVariants} // 자식 요소들의 staggerChildren을 포함하는 컨테이너 variants
      className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'
    >
      <section
        className='flex flex-col gap-[40px] bg-grayscale-500 text-center text-white px-[31px]
        py-[100px]
        md:py-[160px]
        lg:py-[200px]'
      >
        {/* 내부 콘텐츠를 감싸는 div에 itemVariants 적용 */}
        <motion.div
          variants={itemVariants}
          className='m-auto
          w-[335px]
          md:w-[646px]
          lg:w-[924px]'
        >
          {/* h1에 itemVariants 적용 */}
          <motion.h1
            variants={itemVariants}
            className='font-nexon-gothic-bold
          text-[30px]
          md:text-[60px]'
          >
            나만의 위키 만들어 보기
          </motion.h1>
          {/* Button에 itemVariants 적용 */}
          <motion.div variants={itemVariants}>
            <Button
              variant='landingWhite'
              className='mx-[40px] my-[40px] px-[30px] py-[15px] rounded-[15px]
              transition cursor-pointer
              text-[20px] font-pretendard font-semibold
              md:text-[24px]'
            >
              지금 시작하기
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default CTASection;
