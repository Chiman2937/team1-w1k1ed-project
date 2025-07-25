import instance from '../clients/axios';

export interface PostProfilePingPayload {
  code: string;
  securityAnswer: string;
}

export interface PostProfilePingResponse {
  registeredAt: string;
  userId: number;
}

export const postProfilePingAPI = async ({ code, securityAnswer }: PostProfilePingPayload) => {
  const response = await instance.post<PostProfilePingResponse>(`/profiles/${code}/ping`, {
    securityAnswer,
  });
  return response.data;
};
