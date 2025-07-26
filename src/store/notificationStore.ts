import { create } from 'zustand';

type NotificationState = {
  notificationsEnabled: boolean;
  hasNewNotifications: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setHasNewNotifications: (has: boolean) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notificationsEnabled: true,
  hasNewNotifications: false,
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setHasNewNotifications: (has) => set({ hasNewNotifications: has }),
}));
