import axios from 'axios';
import { authAPI } from '@/api/authAPI';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 Access Token 추가
instance.interceptors.request.use(
  (config) => {
    // 클라이언트 사이드에서만 localStorage에 접근 (Next.js SSR/CSR 환경 고려)
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: Access Token 만료 시 재발급 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러이고, 아직 재시도하지 않았으며, 리프레시 토큰 요청 자체가 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh-token'
    ) {
      originalRequest._retry = true; // 무한 루프 방지 플래그

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // ⭐️ Refresh Token을 이용하여 새로운 Access Token 요청
          // 이때, 'instance'를 다시 사용하여 무한 루프에 빠지지 않도록 주의해야 합니다.
          // 이 요청에는 'Authorization' 헤더를 붙이지 않거나, 별도의 refreshInstance를 사용할 수도 있습니다.
          // 여기서는 originalRequest.headers.Authorization을 제거하지 않고 진행합니다.
          // 서버에서 refresh-token 엔드포인트는 토큰 유무와 상관없이 refreshToken 본문만으로 처리하므로 문제 없습니다.
          const res = await authAPI.refreshToken(refreshToken);

          if (res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken); // 새 Access Token 저장
            if (res.refreshToken) {
              // 새 Refresh Token도 주어지면 업데이트
              localStorage.setItem('refreshToken', res.refreshToken);
            }

            // 새로운 Access Token으로 기존 요청 재시도
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
            return instance(originalRequest); // 원래 요청 재시도
          }
        }
      } catch (refreshError) {
        console.error('Refresh Token 요청 실패:', refreshError);
        // Refresh Token 만료 또는 유효하지 않은 경우: 강제 로그아웃
        if (typeof window !== 'undefined') {
          // 클라이언트 사이드에서만 실행
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
