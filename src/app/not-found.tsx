'use client';

import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';

const dropVariants: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const NotFound = () => {
  const numbers = ['4', '0', '4'];

  const baseTransition: Transition = {
    type: 'spring',
    damping: 10,
    stiffness: 100,
    duration: 0.8,
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-grayscale-50 text-white overflow-hidden'>
      <div className='flex space-x-4 text-9xl font-extrabold'>
        {numbers.map((num, index) => (
          <motion.div
            key={index}
            variants={dropVariants}
            initial='initial'
            animate='animate'
            transition={{
              ...baseTransition,
              delay: index * 0.2,
            }}
            className='text-primary-green-200 animate-pulse'
          >
            {num}
          </motion.div>
        ))}
      </div>
      <div className='flex mt-8 text-2xl text-gray-500'>페이지를 찾을 수 없습니다.</div>
      <p className='mt-4 text-lg text-gray-500'>주소가 올바른지 확인해 주세요.</p>
      <Link
        href='/'
        className='text-primary-green-200 m-10 border border-primary-green-200 rounded-2xl py-1 px-6 hover:text-gray-50 hover:bg-primary-green-200'
      >
        홈으로
      </Link>
    </div>
  );
};
export default NotFound;
