'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import NotificationPanel from './NotificationPanel';
import { useNotificationStore } from '@/store/useNotificationStore';
import NotificationBell from './NotificationBell';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';
import { profilesAPI } from '@/api/profile/postProfilesAPI';
import { useAuthContext } from '@/context/AuthContext';

const HeaderAfterLogin = () => {
  // Zustand 상태와 함수 가져오기
  const {
    notificationsEnabled,
    hasNewNotifications,
    list: notifications, // Zustand 스토어의 list를 notifications로 사용
    fetchNotifications, // 알림 불러오기 함수
    startPollingNotifications,
    stopPollingNotifications,
    markNotificationsAsRead, // <-- 추가: 새 알림을 읽음으로 표시하는 함수
  } = useNotificationStore();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const { user } = useAuthContext();

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (!user || !user.profile?.code) {
      setUserProfileImage(null); // 사용자 정보 없으면 이미지도 null
      return;
    }

    const fetchProfileImage = async () => {
      try {
        const imageUrl = await profilesAPI.getProfileImage(user.profile.code);
        console.log('가져온 프로필 이미지 URL:', imageUrl);
        setUserProfileImage(imageUrl);
      } catch (error) {
        console.error('프로필 이미지 가져오기 실패:', error);
        setUserProfileImage(null);
      }
    };

    fetchProfileImage();
  }, [user?.profile?.code]);

  // 폴링 및 알림 상태 관리
  useEffect(() => {
    if (user && notificationsEnabled) {
      // 컴포넌트 마운트 시 초기 알림 로드
      fetchNotifications({ reset: true });
      // 알림 폴링 시작 (5초 간격)
      startPollingNotifications(5000);
    } else {
      // 로그인 상태가 아니거나 알림 비활성화 시 폴링 중지
      stopPollingNotifications();
    }

    // 컴포넌트 언마운트 시 폴링 중지
    return () => {
      stopPollingNotifications();
    };
  }, [
    user,
    notificationsEnabled,
    fetchNotifications,
    startPollingNotifications,
    stopPollingNotifications,
  ]);

  // 알림 패널이 열릴 때 호출되는 함수
  const handlePanelOpen = () => {
    setIsPanelOpen(true);
    // 알림 패널이 열리면 '새 알림' 상태를 해제
    markNotificationsAsRead();
  };

  return (
    <>
      <div
        className='bg-grayscale-50 shadow-md sticky top-0 left-0 w-full z-50
        flex items-center justify-between
        h-[60px]
        md:h-[80px]'
      >
        <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
          <div className='mx-auto flex items-center justify-between'>
            <div className='flex items-center gap-[40px]'>
              <Logo />
              <div className='hidden md:block'>
                <Nav />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <NotificationBell
                notificationsEnabled={notificationsEnabled}
                hasNewNotifications={hasNewNotifications}
                onClick={handlePanelOpen} // <-- 수정: 새롭게 정의한 함수 사용
              />
              <UserDropdown userImage={userProfileImage} />
              <MobileMenu
                hasNewNotifications={hasNewNotifications}
                onNotificationClick={handlePanelOpen} // <-- 수정: 새롭게 정의한 함수 사용
              />
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        list={notifications}
      />
    </>
  );
};

export default HeaderAfterLogin;
