// profile 객체 타입 정의
export interface UserProfile {
  id: number;
  code: string;
}

// user 객체 타입 정의
export interface UserData {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: UserProfile;
}

// API 응답 타입 정의
export interface AuthApiResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}
