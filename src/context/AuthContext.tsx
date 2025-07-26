'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CookiesJs from 'js-cookie';
import { UserData } from '@/types/user';

// AuthContextTYpe이 제공할 값 정의
interface AuthContextType {
  isAuthenticated: boolean; // 로그인 여부
  user: UserData | null; // 로그인한 사용자 정보
  accessToken: string | null; // API 요청에 사용할 접근 토큰
  login: (accessToken: string, refreshToken: string, user: UserData) => void; //로그인 처리 함수
  logout: () => void; //로그아웃 처리 함수
}

// AuthContext 객체 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 컴포넌트 정의
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 현재 로그인 상태인지
  const [user, setUser] = useState<UserData | null>(null); // 로그인한 사용자의 정보
  const [accessToken, setAccessToken] = useState<string | null>(null); // API 호출 시 필요한 토큰

  // 로그인 함수 정의: 외부에서 로그인 API 호출 성공 시 이 함수를 호출
  const login = useCallback(
    (newAccessToken: string, newRefreshToken: string, newUser: UserData) => {
      // Access Token (유효 기간: 5분)
      CookiesJs.set('accessToken', newAccessToken, {
        expires: 5 / (24 * 60),
        secure: process.env.NODE_ENV === 'production',
      }); //

      // Refresh Token (유효 기간: 1일)
      CookiesJs.set('refreshToken', newRefreshToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
      }); //

      // 사용자 정보를 로컬 스토리지에 JSON 문자열 형태로 저장합니다.
      localStorage.setItem('user', JSON.stringify(newUser));

      // Context의 상태 변수들을 업데이트하여 로그인 상태로 변경합니다.
      setAccessToken(newAccessToken); // Access Token을 상태에 저장 (참고: 이는 쿠키에 저장하는 것과 별개로 Context 내부 상태를 업데이트하는 것)
      setUser(newUser);
      setIsAuthenticated(true);

      // 로그인 성공 후 메인 페이지('/')로 이동시킵니다.
      router.push('/');
    },
    [router],
  );

  // 로그아웃 함수 정의: 외부에서 로그아웃 버튼 클릭 시나 토큰 만료 시 호출
  const logout = useCallback(() => {
    CookiesJs.remove('accessToken');
    CookiesJs.remove('refreshToken');
    localStorage.removeItem('user');

    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  // useMemo를 사용하여 contextValue가 불필요하게 다시 생성되는 것을 방지합니다.
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      accessToken,
      user,
      login,
      logout,
    }),
    [isAuthenticated, accessToken, user, login, logout],
  );

  useEffect(() => {
    const storedAccessToken = CookiesJs.get('accessToken'); // 'accessToken' 쿠키에서 가져오기
    const storedRefreshToken = CookiesJs.get('refreshToken'); // 'refreshToken' 쿠키에서 가져오기
    const storedUser = localStorage.getItem('user'); // 'user' 정볼르 로컬 스토리지에서 가져오기

    // 만약 필요한 모든 정보(토큰, 사용자 정보)가 저장되어 있다면
    if (storedAccessToken && storedRefreshToken && storedUser) {
      try {
        // 로컬 스토리지의 사용자 정보는 JSON 문자열이므로, 다시 JavaScript 객체로 변환
        const parsedUser: UserData = JSON.parse(storedUser);
        setAccessToken(storedAccessToken);
        setUser(parsedUser);
        setIsAuthenticated(true); // 모든 정보가 유효하면 로그인된 상태로 설정
      } catch (e) {
        // 만약 로컬 스토리지의 사용자 정보가 손상되었거나 파싱할 수 없다면
        console.error('localStorage에서 파싱 불가', e);
        CookiesJs.remove('accessToken');
        CookiesJs.remove('refreshToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []); // 빈 배열(`[]`)은 이 `useEffect` 훅이 컴포넌트가 처음 마운트될 때 딱 한 번만 실행되도록 한다.

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
