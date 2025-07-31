import instance from '../clients/axios';

interface PatchProfileRequest {
  code: string;
  params: PatchProfilePayload;
}

export interface PatchProfilePayload {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | null;
  content: string;
}

export interface PatchProfileResponse {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  ontent: string;
  nationality: string;
  family: string;
  loodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  bti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export const patchProfileItemAPI = async ({ code, params }: PatchProfileRequest) => {
  const response = await instance.patch<PatchProfileResponse>(`/profiles/${code}`, { ...params });
  return response.data;
};
