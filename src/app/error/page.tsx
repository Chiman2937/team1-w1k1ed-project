'use client';

import { motion, Variants, Transition } from 'framer-motion';
import { FaExclamationTriangle as Exclamation } from 'react-icons/fa';
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

const ErrorPage = () => {
  const numbers = ['E', 'R', 'R', 'O', 'R', '!'];

  const baseTransition: Transition = {
    type: 'spring',
    damping: 10,
    stiffness: 100,
    duration: 0.8,
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white bg-grayscale-50 overflow-hidden'>
      <Exclamation className='text-yellow-400 text-9xl mb-8 animate-pulse' />
      <div className='flex space-x-2 text-8xl font-bold'>
        {numbers.map((num, index) => (
          <motion.div
            key={index}
            variants={dropVariants}
            initial='initial'
            animate='animate'
            transition={{
              ...baseTransition,
              delay: index * 0.1,
            }}
            className='text-red-500 animate-pulse'
          >
            {num}
          </motion.div>
        ))}
      </div>

      <div className='flex mt-8 text-2xl text-gray-500 text-2lg-semibold gap-5'>
        뭔가 잘못되었습니다.
      </div>
      <p className='mt-4 text-lg text-gray-500'>
        다른 페이지에 접속하거나, 재 로그인 후 다시 시도해주세요.
      </p>
      <div className='flex gap-8'>
        <Link
          href='/'
          className='text-red-500 my-10 border-2 border-red-500 rounded-xl py-2 px-6 text-md-semibold hover:text-gray-50 hover:bg-red-500'
        >
          메인 페이지로 이동
        </Link>
        <Link
          href='https://github.com/Chiman2937/team1-w1k1ed-project/issues/new'
          target='_blank'
          className='text-red-500 my-10 border-2 border-red-500 rounded-xl py-2 px-6 text-md-semibold hover:text-gray-50 hover:bg-red-500'
        >
          깃허브에 이슈 남기기
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
