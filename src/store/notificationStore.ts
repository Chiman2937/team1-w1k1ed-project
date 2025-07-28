import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NotificationState = {
  notificationsEnabled: boolean;
  hasNewNotifications: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setHasNewNotifications: (has: boolean) => void;
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      hasNewNotifications: false,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setHasNewNotifications: (has) => set({ hasNewNotifications: has }),
    }),
    {
      name: 'notification-storage', // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
