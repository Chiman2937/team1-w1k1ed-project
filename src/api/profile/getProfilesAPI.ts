import { AxiosResponse } from 'axios';
import instance from '../clients/axios';

export interface Profile {
  id: number;
  code: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: Date | string;
  name: string;
}

export interface GetProfilesResponse {
  totalCount: number;
  list: Profile[];
}

export const getProfilesAPI = async (keyword: string, signal?: AbortSignal): Promise<Profile[]> => {
  const params = {
    page: 1,
    pageSize: 500,
    ...(keyword.trim() && { name: keyword.trim() }),
  };

  const response: AxiosResponse<GetProfilesResponse> = await instance.get('/profiles', {
    params,
    signal,
  });

  return response.data?.list || [];
};
