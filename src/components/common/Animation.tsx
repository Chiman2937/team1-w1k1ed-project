'use client';

import { AnimatePresence, motion } from 'framer-motion';

const Animation = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Animation;
