'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import Logo from './Logo';
import Nav from './Nav';
import HeaderDropdown from './HeaderDropdown';
import NotificationPanel from './NotificationPanel';
import { useAuthContext } from '@/context/AuthContext';

const HeaderAfterLogin = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { logout } = useAuthContext();

  return (
    <>
      <div className='bg-grayscale-50 shadow-md sticky top-0 left-0 w-full z-50'>
        <div className='w-full px-[20px] md:px-[40px] lg:px-[80px]'>
          <div className='mx-auto py-[25px] flex items-center justify-between'>
            <div className='flex items-center gap-[40px]'>
              <Logo />
              <div className='hidden md:block'>
                <Nav />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPanelOpen(true)}
                className='hidden md:inline'
              >
                <FaBell
                  className='text-gray-300 cursor-pointer
                    w-[24px] h-[24px]
                    md:w-[32px] md:h-[32px]'
                />
              </motion.button>

              <div className='hidden md:flex items-center gap-2 cursor-pointer'>
                <HeaderDropdown
                  iconName='account'
                  menuItems={[
                    { label: '마이페이지', href: '/mypage' },
                    { label: '로그아웃', onClick: logout },
                  ]}
                />
              </div>

              {/* 모바일 메뉴 */}
              <div className='inline md:hidden'>
                <HeaderDropdown
                  menuItems={[
                    { label: '위키목록', href: '/wikilist' },
                    { label: '자유게시판', href: '/boards' },
                    { label: '알림' },
                    { label: '마이페이지', href: '/mypage' },
                    { label: '로그아웃', onClick: logout },
                  ]}
                  onItemClick={(label) => {
                    if (label === '알림') {
                      setIsPanelOpen(true); // 알림 클릭 시 패널 열기
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default HeaderAfterLogin;
