'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationItem from '@/components/common/NotificationItem';
import { FaTimes as IconClose } from 'react-icons/fa';
import NotificationSwitch from '@/components/common/NotificationSwitch';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 임포트
import { useNotificationStore } from '@/store/useNotificationStore'; // Zustand 스토어 임포트
import { useAuthContext } from '@/context/AuthContext';

// Zustand 스토어에서 Notification 인터페이스를 가져옵니다.
import { Notification } from '@/store/useNotificationStore';

// Item 타입을 Notification으로 대체
type Props = {
  isOpen: boolean;
  onClose: () => void;
  list: Notification[]; // 알림 목록을 prop으로 받음 (Notification 타입 사용)
  // onDeleteItem: (id: number) => void; // 이제 Zustand 스토어에서 직접 삭제하므로, 이 prop은 더 이상 필요 없습니다.
};

const NotificationPanel = ({ isOpen, onClose, list }: Props) => {
  const router = useRouter();
  const { deleteNotification } = useNotificationStore(); // Zustand 스토어에서 deleteNotification 함수 가져오기
  const { user } = useAuthContext();

  const handleNotificationClick = async (id: number) => {
    // 1. 알림 삭제 요청
    await deleteNotification(id); // Zustand 스토어의 deleteNotification 사용

    // 2. 위키 페이지로 이동
    let wikiPageUrl: string;

    // user가 존재하고 user.profile이 존재하며 user.profile.code가 존재할 때만 사용
    if (user && user.profile && user.profile.code) {
      wikiPageUrl = `/wiki/${user.profile.code}`;
    } else {
      // user 정보가 없을 경우 이동할 기본 페이지 설정 또는 에러 처리
      // 예: 로그인 페이지로 리다이렉트하거나, 기본 위키 홈 페이지로 이동
      console.warn('사용자 프로필 정보가 없어 기본 위키 페이지로 이동합니다.');
      wikiPageUrl = '/wiki/default'; // 또는 '/login' 등으로 변경
    }

    router.push(wikiPageUrl);

    // 3. 알림 패널 닫기
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as='div' className='relative z-50' open={isOpen} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='fixed top-0 right-0 w-[380px] h-full bg-gray-100 shadow-xl'
          >
            <DialogPanel className='h-full flex flex-col p-4'>
              <div className='flex justify-between items-center'>
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
                      onDelete={() => deleteNotification(item.id)} // 삭제 버튼 클릭 시
                      onClick={() => handleNotificationClick(item.id)} // 알림 항목 클릭 시
                    />
                  ))
                ) : (
                  <div
                    className='flex flex-col items-center justify-center 
                    py-[16px] text-gray-500 bg-gray-50 rounded-[5px] 
                    w-full h-full'
                  >
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
