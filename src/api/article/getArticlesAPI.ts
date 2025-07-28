import { AxiosResponse } from 'axios';
import instance from '../clients/axios';

// 게시글 작성자 타입
export interface ArticleWriterResponse {
  name: string;
  id: number;
}

// 게시글 타입
export interface ArticleResponse {
  createdAt: Date | string;
  id: number;
  image: string;
  likeCount: number;
  title: string;
  updatedAt: Date | string;
  writer: ArticleWriterResponse;
}

// 정렬 조건 타입
export type OrderByType = 'recent' | 'like';

// 전체 응답 타입
export interface GetArticlesResponse {
  totalCount: number;
  list: ArticleResponse[];
}

// 게시글 목록 조회 API
export const getArticlesAPI = async (
  keyword: string,
  orderBy: OrderByType = 'recent',
  signal?: AbortSignal,
): Promise<ArticleResponse[]> => {
  const params = {
    page: 1,
    pageSize: 500,
    orderBy,
    ...(keyword.trim() && { keyword: keyword.trim() }),
  };

  const response: AxiosResponse<GetArticlesResponse> = await instance.get('/articles', {
    params,
    signal,
  });

  return response.data.list || [];
};
