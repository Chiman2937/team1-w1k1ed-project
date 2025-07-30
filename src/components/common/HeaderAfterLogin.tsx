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
    deleteNotification, // 알림 삭제 함수
  } = useNotificationStore();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const { user } = useAuthContext();

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (!user || !user.profile.code) return;

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

  // 컴포넌트 마운트 시 알림 목록 불러오기 (초기 데이터 로드)
  useEffect(() => {
    fetchNotifications({ reset: true }); // 컴포넌트 마운트 시 알림 목록 초기화 및 불러오기
  }, [fetchNotifications]); // fetchNotifications 함수가 변경될 때 (실제로는 변경되지 않음)

  // 알림 삭제 함수를 Zustand 스토어의 deleteNotification으로 대체
  const handleDeleteNotification = (id: number) => {
    deleteNotification(id);
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
        onDeleteItem={handleDeleteNotification}
      />
    </>
  );
};

export default HeaderAfterLogin;
