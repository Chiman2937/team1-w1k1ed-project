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

  const rawProfiles = response.data?.list || [];

  // 검색어가 있으면 필터링
  if (keyword.trim()) {
    const searchTerm = keyword.trim().toLowerCase();

    const filtered = rawProfiles.filter((profile) => {
      // 뒤의 숫자 2자리를 제거한 이름으로 검색
      const nameWithoutSuffix = profile.name.replace(/\d{2}$/, '').toLowerCase();
      return nameWithoutSuffix.includes(searchTerm);
    });

    // 필터링된 결과에서도 뒤 2자리 제거
    return filtered.map((profile) => ({
      ...profile,
      name: profile.name.replace(/\d{2}$/, ''),
    }));
  }

  // 검색어가 없으면 전체 반환 (뒤 2자리 제거)
  return rawProfiles.map((profile) => ({
    ...profile,
    name: profile.name.replace(/\d{2}$/, ''),
  }));
};
