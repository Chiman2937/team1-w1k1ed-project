import axios from 'axios';
import { authAPI } from '@/api/authAPI';
import Cookies from 'js-cookie';

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
    // 첫 번째 콜백: 요청이 성공적으로 보내지기 전에 실행
    // 클라이언트 사이드에서만 쿠키에 접근 (Next.js SSR/CSR 환경 고려)
    if (typeof window !== 'undefined') {
      const accessToken = Cookies.get('accessToken'); // Access Token 가져오기
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // 요청 헤더에 Authorization 추가
      }
    }
    return config; // 수정된 config 객체 반환
  },
  (error) => {
    // 두 번째 콜백: 요청 준비 중 에러 발생 시 실행
    return Promise.reject(error); // 에러를 Promise.reject로 반환
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
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          const res = await authAPI.refreshToken(refreshToken);

          if (res.accessToken) {
            Cookies.set('accessToken', res.accessToken, { secure: true, expires: 1 / 24 }); // 새 Access Token 저장
            if (res.refreshToken) {
              Cookies.set('refreshToken', res.refreshToken, { secure: true, expires: 7 });
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
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
