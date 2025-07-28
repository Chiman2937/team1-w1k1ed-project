'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import Logo from './Logo';
import Nav from './Nav';
import HeaderDropdown from './HeaderDropdown';
import NotificationPanel from './NotificationPanel';
import { useAuthContext } from '@/context/AuthContext';
import Button from './Button';
import { useNotificationStore } from '@/store/useNotificationStore';

// NotificationItem에서 사용하는 Item 타입 정의
type Item = {
  id: number;
  content: string;
  createdAt: string;
};

const HeaderAfterLogin = () => {
  // Zustand 상태와 함수 가져오기
  const { notificationsEnabled, hasNewNotifications, setHasNewNotifications } =
    useNotificationStore();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Item[]>([
    // 알림 목록 상태를 HeaderAfterLogin으로 옮김
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

  const { logout } = useAuthContext();

  // 새 알림 추가 함수 (NotificationPanel로 전달)
  const handleAddNotification = () => {
    // 알림이 비활성화 상태일 때는 함수 실행 중단
    if (!notificationsEnabled) {
      return;
    }

    const newItem: Item = {
      id: notifications.length > 0 ? Math.max(...notifications.map((item) => item.id)) + 1 : 1,
      content: `새 알림 ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
    };
    setNotifications([newItem, ...notifications]);
    setHasNewNotifications(true); // 새 알림이 추가되었음을 표시
  };

  // 알림 삭제 함수 (NotificationPanel로 전달)
  const handleDeleteNotification = (id: number) => {
    setNotifications((prevList) => prevList.filter((item) => item.id !== id));
    // 모든 알림을 삭제했을 때 빨간 점 없애기
    if (notifications.length === 1 && notifications[0].id === id) {
      // 마지막 알림이 삭제될 때
      setHasNewNotifications(false);
    }
  };

  // 알림 패널이 열리면 새 알림 표시를 해제
  useEffect(() => {
    if (isPanelOpen) {
      setHasNewNotifications(false);
    }
  }, [isPanelOpen, setHasNewNotifications]);

  return (
    <>
      <div className='bg-grayscale-50 shadow-md sticky top-0 left-0 w-full z-50'>
        <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
          <div className='mx-auto py-[25px] flex items-center justify-between'>
            <div className='flex items-center gap-[40px]'>
              <Logo />
              <div className='hidden md:block'>
                <Nav />
              </div>
            </div>
            {/* 알림 추가 버튼 */}
            <div className='mb-4'>
              <Button onClick={handleAddNotification}>새 알림 추가</Button>
            </div>
            <div className='flex items-center gap-4'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPanelOpen(true)}
                className='hidden md:inline relative'
              >
                {notificationsEnabled ? ( // notificationsEnabled에 따라 아이콘을 조건부 렌더링
                  <FaBell
                    className='text-gray-300 cursor-pointer
                      w-6 h-6
                      md:w-[32px] md:h-[32px]'
                  />
                ) : (
                  <div className='relative w-6 h-6 md:w-[32px] md:h-[32px]'>
                    <FaBell className='text-gray-300 w-full h-full' />
                    {/* Diagonal Line (사선) */}
                    <div
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[120%] h-[2px] bg-gray-300 rotate-45 ring-2 ring-white'
                    ></div>
                  </div>
                )}
                {hasNewNotifications && ( // 조건부로 빨간 점 렌더링
                  <span
                    className='absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-secondary-red-200'
                    aria-hidden='true'
                  ></span>
                )}
              </motion.button>

              <div className='hidden md:flex items-center gap-2 cursor-pointer'>
                <HeaderDropdown
                  iconName='account'
                  menuItems={[
                    { label: '위키 생성하기', href: '/mypage' },
                    { label: '설정', href: '/settings' },
                    { label: '로그아웃', onClick: logout },
                  ]}
                />
              </div>

              {/* 모바일 메뉴 */}
              <div className='inline md:hidden'>
                <HeaderDropdown
                  hasNewNotifications={hasNewNotifications}
                  menuItems={[
                    { label: '위키목록', href: '/wikilist' },
                    { label: '자유게시판', href: '/boards' },
                    { label: '알림', hasNewNotifications: hasNewNotifications },
                    { label: '위키 생성하기', href: '/mypage' },
                    { label: '설정', href: '/settings' },
                    { label: '로그아웃', onClick: logout },
                  ]}
                  onItemClick={(label) => {
                    if (label === '알림') {
                      setIsPanelOpen(true); // 알림 클릭 시 패널 열기
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        list={notifications} // 알림 목록 전달
        onDeleteItem={handleDeleteNotification} // 알림 삭제 함수 전달
      />
    </>
  );
};

export default HeaderAfterLogin;
