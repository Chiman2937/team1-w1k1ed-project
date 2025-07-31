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
  pollingIntervalId: NodeJS.Timeout | null; // <--- 주기적인 폴링을 위한 Interval ID 추가

  // 동작 함수
  fetchNotifications: (opts?: { reset?: boolean }) => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  clearNotifications: () => void;
  startPollingNotifications: (interval?: number) => void; // <--- 폴링 시작 함수
  stopPollingNotifications: () => void; // <--- 폴링 중지 함수
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
      pollingIntervalId: null, // <--- 초기값 설정

      // 알림 목록 불러오기
      fetchNotifications: async ({ reset = false } = {}) => {
        const { page, pageSize, list, totalCount: prevTotalCount } = get();
        const nextPage = reset ? 1 : page;

        // 이미 로딩 중이면 중복 요청 방지
        if (get().loading && !reset) return;

        set({ loading: true, error: null });

        try {
          const res = await notificationsAPI.getList(nextPage, pageSize);
          const newList = reset ? res.list : [...res.list, ...list];

          set({
            list: newList,
            totalCount: res.totalCount,
            page: nextPage + 1,
            hasNextPage: newList.length < res.totalCount,
            // 새로 불러온 totalCount가 이전 totalCount보다 크고, 알림이 활성화 상태일 때만 새 알림이 있다고 표시
            hasNewNotifications: get().notificationsEnabled && res.totalCount > prevTotalCount,
          });
        } catch (err) {
          console.error('알림 불러오기 실패:', err);
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
            // 삭제 후 totalCount가 변경되므로 hasNextPage도 업데이트
            hasNextPage: updatedList.length < get().totalCount,
            // 모든 알림을 지웠으면 새 알림도 없다고 표시
            hasNewNotifications: updatedList.length === 0 ? false : get().hasNewNotifications,
          });
        } catch (err) {
          console.error('알림 삭제 실패:', err);
          set({ error: '알림 삭제 실패' });
        }
      },

      // 초기화 전부 삭제
      clearNotifications: () => {
        set({
          list: [],
          totalCount: 0,
          page: 1,
          hasNextPage: true,
          error: null,
          hasNewNotifications: false, // 모두 삭제니 새 알림도 없음
        });
      },

      // 새로운 폴링 관련 함수
      startPollingNotifications: (interval = 30000) => {
        // 기본 5초 간격
        const { pollingIntervalId, fetchNotifications } = get();
        if (pollingIntervalId) {
          clearInterval(pollingIntervalId); // 기존 인터벌이 있다면 중지
        }

        const newIntervalId = setInterval(() => {
          console.log('알림 폴링 중...');
          fetchNotifications({ reset: true });
        }, interval);

        set({ pollingIntervalId: newIntervalId });
      },

      stopPollingNotifications: () => {
        const { pollingIntervalId } = get();
        if (pollingIntervalId) {
          clearInterval(pollingIntervalId);
          set({ pollingIntervalId: null });
          console.log('알림 폴링 중지');
        }
      },
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        notificationsEnabled: state.notificationsEnabled,
        hasNewNotifications: state.hasNewNotifications,
        totalCount: state.totalCount,
      }),
    },
  ),
);
