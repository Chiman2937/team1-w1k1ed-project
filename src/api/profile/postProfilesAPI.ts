import instance from '@/api/clients/axios';

interface SecurityQuestionPayload {
  securityAnswer: string;
  securityQuestion: string;
}

interface ProfileResponse {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export const profilesAPI = {
  createSecurityQuestion: async (payload: SecurityQuestionPayload): Promise<ProfileResponse> => {
    try {
      // axios.ts에서 설정된 'instance'를 사용하여 API 호출
      const response = await instance.post<ProfileResponse>('/profiles', payload);
      return response.data;
    } catch (error) {
      // 에러 처리 로직 (예: 로깅, 특정 에러 코드 처리)
      // axios.ts의 응답 인터셉터에서 이미 401 에러를 처리하므로,
      // 여기서는 다른 종류의 에러나 최종적으로 처리되지 않은 에러를 다룰 수 있음
      console.error('프로필 보안 질문 생성 API 에러:', error);
      // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
      throw error;
    }
  },
};
