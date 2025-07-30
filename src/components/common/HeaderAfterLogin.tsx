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
    setHasNewNotifications,
    list: notifications, // Zustand 스토어의 list를 notifications로 사용
    fetchNotifications, // 알림 불러오기 함수
    startPollingNotifications,
    stopPollingNotifications,
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
  }, [user]);

  // 컴포넌트 마운트 시 초기 알림 목록 불러오기 및 폴링 시작/중지
  useEffect(() => {
    // 사용자가 로그인되어 있고, 알림 기능이 활성화되어 있을 때만 폴링 시작
    if (user && notificationsEnabled) {
      fetchNotifications({ reset: true }); // 초기 로드
      startPollingNotifications(5000); // 5초마다 폴링 시작
    } else {
      stopPollingNotifications(); // 로그인 상태가 아니거나 알림 비활성화 시 폴링 중지
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
      stopPollingNotifications(); // 알림 비활성화 시 폴링 중지
    } else if (user) {
      // 알림 활성화되고 사용자 로그인 상태면 다시 폴링 시작
      startPollingNotifications(5000);
    }
  }, [
    notificationsEnabled,
    setHasNewNotifications,
    user,
    startPollingNotifications,
    stopPollingNotifications,
  ]);

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
                onClick={() => setIsPanelOpen(true)}
              />
              <UserDropdown userImage={userProfileImage} />
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
      />
    </>
  );
};

export default HeaderAfterLogin;
