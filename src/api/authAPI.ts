import instance from '@/api/clients/axios';

interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    profile: {
      id: number;
      code: string;
    };
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface ResetPasswordPayload {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface ResetPasswordResponse {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

export const authAPI = {
  signIn: async (payload: LoginPayload): Promise<AuthSuccessResponse> => {
    const response = await instance.post<AuthSuccessResponse>('auth/signIn', payload);
    return response.data;
  },

  signUp: async (payload: SignUpPayload): Promise<AuthSuccessResponse> => {
    const response = await instance.post<AuthSuccessResponse>('/auth/signUp', payload);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthSuccessResponse> => {
    const response = await instance.post<AuthSuccessResponse>('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    const response = await instance.patch<ResetPasswordResponse>('/users/me/password', payload);
    return response.data;
  },
};
