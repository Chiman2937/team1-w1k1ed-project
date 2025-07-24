'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/common/Button';
import NotificationItem from '@/components/common/NotificationItem';
import { FaTimes } from 'react-icons/fa';

type Item = {
  id: number;
  content: string;
  createdAt: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// 추후에 api데이터로 수정 res데이터와 동일한 구성
const NotificationPanel = ({ isOpen, onClose }: Props) => {
  const [list, setList] = useState<Item[]>([
    {
      id: 1,
      content: '첫 번째 알림입니다.',
      createdAt: '2025-07-19T12:39:23.618Z',
    },
    {
      id: 2,
      content: '두 번째 알림이 도착했어요!',
      createdAt: '2025-07-19T12:45:00.000Z',
    },
  ]);

  // 알림 추가 함수
  const handleAddItem = () => {
    const newItem: Item = {
      id: list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1,
      content: `새 알림 ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
    };
    setList([...list, newItem]);
  };

  // 알림 삭제 함수
  const handleDeleteItem = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as='div' className='relative z-50' open={isOpen} onClose={onClose}>
          {/* 오버레이 */}
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' onClick={onClose} />

          {/* 알림 패널 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 right-0 w-[368px] h-full bg-gray-100 shadow-xl'
          >
            <DialogPanel className='h-full flex flex-col p-4'>
              <div className='flex justify-between items-center mb-4'>
                <DialogTitle className='text-lg font-semibold'>알림 {list.length}개</DialogTitle>
                {/* 알림 추가 버튼 */}
                <div className='mb-4'>
                  <Button onClick={handleAddItem}>새 알림 추가</Button>
                </div>
                <FaTimes onClick={onClose} className='cursor-pointer text-gray-400' />
              </div>

              {/* 알림 목록 */}
              <div className='flex-1 overflow-y-auto flex flex-col gap-[8px]'>
                {list.length > 0 ? (
                  list.map((item) => (
                    <NotificationItem
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      createdAt={item.createdAt}
                      onDelete={handleDeleteItem}
                    />
                  ))
                ) : (
                  <p className='text-gray-500 text-center py-[16px] bg-gray-50 rounded-[5px]'>
                    알림이 없습니다.
                  </p>
                )}
              </div>
            </DialogPanel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
