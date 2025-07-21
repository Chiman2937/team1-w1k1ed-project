'use client';

import { useAuthContext } from '@/context/AuthContext';
import HeaderAfterLogin from '../common/HeaderAfterLogin';
import HeaderBeforeLogin from '../common/HeaderBeforeLogin';

const AuthHeaderRenderer = () => {
  const { isAuthenticated } = useAuthContext();

  // 로그인 상태에 따라 둘 중 하나의 헤더만 렌더링
  if (isAuthenticated) {
    return <HeaderAfterLogin />;
  } else {
    return <HeaderBeforeLogin />;
  }
};

export default AuthHeaderRenderer;
