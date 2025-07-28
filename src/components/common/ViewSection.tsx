import Image from 'next/image';
import { motion, useAnimation, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// 컨테이너와 아이템 variants 분리
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, // 자식들이 0.5초 간격으로 등장
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

const ViewSection = () => {
  const controls = useAnimation();
  // triggerOnce: true로 설정하여 한 번만 애니메이션이 실행되도록 합니다.
  // threshold: 0.2는 요소의 20%가 보일 때 애니메이션을 트리거합니다.
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]); // controls와 inView가 변경될 때마다 이 효과를 다시 실행합니다.

  return (
    // 전체 섹션을 motion.div로 감싸고 애니메이션 컨트롤을 연결합니다.
    <motion.div
      ref={ref} // useInView 훅과 연결하여 뷰포트 진입을 감지합니다.
      initial='hidden' // 초기 상태는 hidden (opacity: 0, y: 30)
      animate={controls} // useAnimation 훅으로 제어되는 애니메이션
      variants={containerVariants} // 자식 요소들의 staggerChildren을 포함하는 컨테이너 variants
      className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'
    >
      <main
        className='mx-auto
        w-[335px]
        md:w-[646px]
        lg:w-[924px]'
      >
        <section
          className=' py-[100px]
        md:py-[160px]
        lg:py-[200px]'
        >
          {/* 텍스트 블록에 itemVariants 적용 */}
          <motion.div variants={itemVariants} className='text-left'>
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
          </motion.div>

          <motion.div variants={itemVariants} className='flex flex-col gap-[10px]'>
            <Image
              src='/images/type=image4.png'
              alt='밝은 테마 채팅 화면'
              width={924}
              height={280}
              className='border border-none rounded-[10px]
              w-[335px] h-[102px]
              md:w-[648px] md:h-[196px]
              lg:w-[924px] lg:h-[280px]'
            />
            <motion.div
              variants={itemVariants}
              className='flex
              w-[335px] h-[102px] gap-[10px]
              md:w-[648px] md:h-[196px] md:gap-[22px]
              lg:w-[924px] lg:h-[280px] lg:gap-[40px]'
            >
              <Image
                src='/images/type=image6.png'
                alt='알림 종 아이콘'
                width={280}
                height={280}
                className='bg-secondary-purple-100 border border-none rounded-[10px] aspect-square
                w-[102px]
                md:w-[198px]
                lg:w-[280px]'
              />
              <Image
                src='/images/type=image5.png'
                alt='FAQ 채팅 버블'
                width={604}
                height={280}
                className='border border-none rounded-[10px]
                w-[223px] h-[102px]
                md:w-[428px] md:h-[198px]
                lg:w-[604px] lg:h-[280px]'
              />
            </motion.div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

export default ViewSection;
