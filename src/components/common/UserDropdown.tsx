import HeaderDropdown from './HeaderDropdown';
import { useAuthContext } from '@/context/AuthContext';

const UserDropdown = () => {
  const { logout } = useAuthContext();

  const menuItems = [
    { label: '위키 생성하기', href: '/mypage' },
    { label: '설정', href: '/settings' },
    { label: '로그아웃', onClick: logout },
  ];

  return (
    <div className='hidden md:flex items-center gap-2 cursor-pointer'>
      <HeaderDropdown iconName='account' menuItems={menuItems} />
    </div>
  );
};

export default UserDropdown;
