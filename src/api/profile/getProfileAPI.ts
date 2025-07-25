import instance from '../clients/axios';

interface GetProfileItemPayload {
  code: string;
}

export interface GetProfileItemResponse {
  id: number;
  code: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

export const getProfileItemAPI = async ({ code }: GetProfileItemPayload) => {
  const response = await instance.get<GetProfileItemResponse>(`/profiles/${code}`);
  return response.data;
};
