import HeaderDropdown from './HeaderDropdown';
import { useAuthContext } from '@/context/AuthContext';

type MobileMenuProps = {
  hasNewNotifications: boolean;
  onNotificationClick: () => void;
};

const MobileMenu = ({ hasNewNotifications, onNotificationClick }: MobileMenuProps) => {
  const { logout } = useAuthContext();

  const menuItems = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
    {
      label: '알림',
      hasNewNotifications: hasNewNotifications,
      onClick: onNotificationClick,
    },
    { label: '위키 생성하기', href: '/mypage' },
    { label: '설정', href: '/settings' },
    { label: '로그아웃', onClick: logout },
  ];

  return (
    <div className='inline md:hidden'>
      <HeaderDropdown
        hasNewNotifications={hasNewNotifications}
        menuItems={menuItems}
        onItemClick={(label) => {
          if (label === '알림') {
            onNotificationClick();
          }
        }}
      />
    </div>
  );
};

export default MobileMenu;
