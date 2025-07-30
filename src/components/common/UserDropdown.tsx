'use client';

import React from 'react'; // useEffect 임포트
import HeaderDropdown from './HeaderDropdown';
import { useAuthContext } from '@/context/AuthContext';

type Props = {
  userImage: string | null; // 이미지 URL을 prop으로 받음
};

const UserDropdown = ({ userImage }: Props) => {
  const { user, logout } = useAuthContext();

  // 드롭다운 메뉴 아이템 정의
  const menuItems = [
    {
      label: '나의 위키',
      href: user?.profile?.code ? `/wiki/${user.profile.code}` : '/create-wiki',
    },
    { label: '위키 생성하기', href: '/mypage' },
    { label: '설정', href: '/settings' },
    { label: '로그아웃', onClick: logout },
  ];

  return (
    <div className='hidden md:flex items-center gap-2 cursor-pointer'>
      {userImage ? ( // userImage가 있으면 이미지 렌더링
        <HeaderDropdown
          imageSrc={userImage} // 이미지 URL 전달
          menuItems={menuItems}
        />
      ) : (
        // userImage가 없으면 기본 account 아이콘 렌더링
        <HeaderDropdown iconName='account' menuItems={menuItems} />
      )}
    </div>
  );
};

export default UserDropdown;
