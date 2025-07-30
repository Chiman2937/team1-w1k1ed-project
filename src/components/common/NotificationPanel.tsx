'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationItem from '@/components/common/NotificationItem';
import { FaTimes as IconClose } from 'react-icons/fa';
import NotificationSwitch from '@/components/common/NotificationSwitch';
import Image from 'next/image';

type Item = {
  id: number;
  content: string;
  createdAt: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  list: Item[]; // 알림 목록을 prop으로 받음
  onDeleteItem: (id: number) => void; // 알림 삭제 함수를 prop으로 받음
};

const NotificationPanel = ({ isOpen, onClose, list, onDeleteItem }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as='div' className='relative z-50' open={isOpen} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }} // 초기 상태: 투명
            animate={{ opacity: 1 }} // 열리는 상태: 불투명
            exit={{ opacity: 0 }} // 닫히는 상태: 투명
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }} // 초기 상태: 오른쪽 밖(100%)에 위치하며 투명
            animate={{ x: 0, opacity: 1 }} // 열리는 상태: 제자리에(0) 오며 불투명
            exit={{ x: '100%', opacity: 1 }} // 닫히는 상태: 오른쪽 밖으로 이동하며 불투명
            transition={{ duration: 0.2 }}
            className='fixed top-0 right-0 w-[380px] h-full bg-gray-100 shadow-xl'
          >
            <DialogPanel className='h-full flex flex-col p-4'>
              <div className='flex justify-between items-center px-1'>
                <DialogTitle className='text-lg font-semibold text-grayscale-500'>
                  알림 {list.length}개
                </DialogTitle>

                <IconClose onClick={onClose} className='cursor-pointer text-grayscale-500' />
              </div>

              <NotificationSwitch />

              {/* 알림 목록 */}
              <div className='flex-1 overflow-y-auto flex flex-col gap-[8px]'>
                {/* 알림 목록이 비어있는 경우에만 메시지 표시 */}
                {list.length > 0 ? (
                  list.map((item) => (
                    <NotificationItem
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      createdAt={item.createdAt}
                      onDelete={onDeleteItem}
                    />
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-[16px] text-gray-500 bg-gray-50 rounded-[5px]'>
                    <Image
                      src='/images/type=image8.png'
                      alt='알림 없음'
                      width={100}
                      height={100}
                      priority
                      className='mb-4 grayscale'
                    />
                    <p className='text-center'>알림이 없습니다.</p>
                  </div>
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
