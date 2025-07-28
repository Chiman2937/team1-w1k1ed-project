'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationItem from '@/components/common/NotificationItem';
import { FaTimes as IconClose } from 'react-icons/fa';
import { useNotificationStore } from '@/store/notificationStore'; // Zustand 스토어 임포트

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
  // Zustand 스토어에서 알림 활성화 상태를 가져옵니다.
  const { notificationsEnabled } = useNotificationStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as='div' className='relative z-50' open={isOpen} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }} // 초기 상태: 투명
            animate={{ opacity: 1 }} // 열리는 상태: 불투명
            exit={{ opacity: 0 }} // 닫히는 상태: 투명
            transition={{ duration: 0.2 }} // 0.2초 동안 전환
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }} // 초기 상태: 오른쪽 밖(100%)에 위치하며 투명
            animate={{ x: 0, opacity: 1 }} // 열리는 상태: 제자리에(0) 오며 불투명
            exit={{ x: '100%', opacity: 1 }} // 닫히는 상태: 오른쪽 밖으로 이동하며 불투명
            transition={{ duration: 0.2 }} // 0.3초 동안 전환
            className='fixed top-0 right-0 w-[380px] h-full bg-gray-100 shadow-xl'
          >
            <DialogPanel className='h-full flex flex-col p-4'>
              <div className='flex justify-between items-center mb-4'>
                <DialogTitle className='text-lg font-semibold text-grayscale-500'>
                  알림 {list.length}개
                </DialogTitle>

                <IconClose onClick={onClose} className='cursor-pointer text-grayscale-500' />
              </div>

              {/* 알림 목록 */}
              <div className='flex-1 overflow-y-auto flex flex-col gap-[8px]'>
                {/* 알림 활성화 상태에 따라 다른 메시지 표시 */}
                {!notificationsEnabled ? (
                  <p className='text-gray-500 text-center py-[16px] bg-gray-50 rounded-[5px]'>
                    알림 기능이 비활성화되어 있습니다.
                  </p>
                ) : list.length > 0 ? (
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
