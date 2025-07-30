import instance from '@/api/clients/axios';

interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

interface NotificationsResponse {
  totalCount: number;
  list: Notification[];
}

export const notificationsAPI = {
  // 알림 목록 조회
  getList: async (page: number = 1, pageSize: number = 10): Promise<NotificationsResponse> => {
    const response = await instance.get<NotificationsResponse>('/notifications', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // 개별 알림 삭제
  delete: async (id: number): Promise<Notification> => {
    const response = await instance.delete<Notification>(`/notifications/${id}`);
    return response.data;
  },
};
