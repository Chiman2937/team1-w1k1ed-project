import instance from '../clients/axios';

export interface GetProfilePingPayload {
  code: string;
}

export interface GetProfilePingResponse {
  registeredAt: string;
  userId: number;
}

export const getProfilePingAPI = async ({ code }: GetProfilePingPayload) => {
  const response = await instance.get<GetProfilePingResponse>(`/profiles/${code}/ping`);
  return response.data;
};
