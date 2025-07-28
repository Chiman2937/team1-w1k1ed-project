import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { notificationsAPI } from '@/api/notificationsAPI';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

interface NotificationStore {
  // 알림 설정 관련
  notificationsEnabled: boolean;
  hasNewNotifications: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setHasNewNotifications: (has: boolean) => void;

  // 알림 리스트 관련
  list: Notification[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;

  // 동작 함수
  fetchNotifications: (opts?: { reset?: boolean }) => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  resetNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      // 알림 설정 초기값
      notificationsEnabled: true,
      hasNewNotifications: false,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setHasNewNotifications: (has) => set({ hasNewNotifications: has }),

      // 알림 리스트 초기값
      list: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
      error: null,

      // 알림 목록 불러오기
      fetchNotifications: async ({ reset = false } = {}) => {
        const { page, pageSize, list } = get();
        const nextPage = reset ? 1 : page;

        set({ loading: true, error: null });

        try {
          const res = await notificationsAPI.getList(nextPage, pageSize);
          const newList = reset ? res.list : [...list, ...res.list];

          set({
            list: newList,
            totalCount: res.totalCount,
            page: nextPage + 1,
            hasNextPage: newList.length < res.totalCount,
          });
        } catch (err) {
          console.error('알림 불러오기 실패:', err); // 토스트?
          set({ error: '알림을 불러오는 데 실패했어요.' });
        } finally {
          set({ loading: false });
        }
      },

      // 알림 삭제
      deleteNotification: async (id: number) => {
        try {
          await notificationsAPI.delete(id);
          const updatedList = get().list.filter((n) => n.id !== id);
          set({
            list: updatedList,
            totalCount: updatedList.length,
            hasNextPage: updatedList.length < get().totalCount,
          });
        } catch (err) {
          console.error('알림 불러오기 실패:', err); // 토스트?
          set({ error: '알림 삭제 실패' });
        }
      },

      // 초기화 전부 삭제
      resetNotifications: () => {
        set({
          list: [],
          totalCount: 0,
          page: 1,
          hasNextPage: true,
          error: null,
        });
      },
    }),
    {
      // 로컬 스토리지에 두고 활용할 데이터만 저장
      // 이후에 totalCount도 저장해서 새로 불러온 totalCount와 다르면 빨간 점을 띄울 수 있겠다.
      name: 'notification-storage',
      partialize: (state) => ({
        notificationsEnabled: state.notificationsEnabled,
        hasNewNotifications: state.hasNewNotifications,
      }),
    },
  ),
);
