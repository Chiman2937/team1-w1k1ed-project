import instance from '@/api/clients/axios';

interface SecurityQuestionPayload {
  securityAnswer: string;
  securityQuestion: string;
}

export interface ProfileResponse {
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

// API 응답 구조: ProfileResponse 배열을 포함하는 객체 (getProfileList 등의 함수에서 사용 가능)
export interface ProfileListResponse {
  list: ProfileResponse[];
  totalCount: number;
}

export const profilesAPI = {
  createSecurityQuestion: async (payload: SecurityQuestionPayload): Promise<ProfileResponse> => {
    try {
      const response = await instance.post<ProfileResponse>('/profiles', payload);
      return response.data;
    } catch (error) {
      console.error('프로필 보안 질문 생성 API 에러:', error);
      throw error;
    }
  },

  getProfileImage: async (code: string): Promise<string | null> => {
    try {
      const response = await instance.get<ProfileListResponse>('/profiles');
      const profileList = response.data.list;

      const userProfile = profileList.find((profile) => profile.code === code);

      if (userProfile?.image) return userProfile.image;
      console.warn(`code ${code}에 해당하는 이미지가 없습니다.`);
      return null;
    } catch (error) {
      console.error(`code ${code} 이미지 로딩 실패:`, error);
      throw error;
    }
  },
};
