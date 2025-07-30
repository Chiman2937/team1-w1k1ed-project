'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import NotificationPanel from './NotificationPanel';
import Button from './Button';
import { useNotificationStore } from '@/store/useNotificationStore';
import NotificationBell from './NotificationBell';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';

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

  // notificationsEnabled 상태가 false로 변경되면 hasNewNotifications도 false로 설정
  useEffect(() => {
    if (!notificationsEnabled) {
      setHasNewNotifications(false);
    }
  }, [notificationsEnabled, setHasNewNotifications]);

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

            <div className='mb-4'>
              <Button onClick={handleAddNotification}>새 알림 추가</Button>
            </div>

            <div className='flex items-center gap-4'>
              {/* 분리된 컴포넌트 사용 */}
              <NotificationBell
                notificationsEnabled={notificationsEnabled}
                hasNewNotifications={hasNewNotifications}
                onClick={() => setIsPanelOpen(true)}
              />

              {/* 분리된 컴포넌트 사용 */}
              <UserDropdown />

              {/* 분리된 컴포넌트 사용 */}
              <MobileMenu
                hasNewNotifications={hasNewNotifications}
                onNotificationClick={() => setIsPanelOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        list={notifications}
        onDeleteItem={handleDeleteNotification}
      />
    </>
  );
};

export default HeaderAfterLogin;
