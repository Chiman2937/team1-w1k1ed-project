'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import clsx from 'clsx';
import { useAuthContext } from '@/context/AuthContext';

const ICONS = {
  hamburger: GiHamburgerMenu,
  account: VscAccount,
};

type DropdownMenuItem = {
  label: string;
  href?: string;
  isLogout?: boolean;
};

type Props = {
  iconName?: 'hamburger' | 'account';
  menuItems: DropdownMenuItem[];
};

const HeaderDropdown = ({ iconName = 'hamburger', menuItems }: Props) => {
  const Icon = ICONS[iconName];
  const { logout } = useAuthContext();

  const handleLogout = () => {
    console.log('로그아웃');
    logout();
    // 여기에 실제 로그아웃 처리 로직 작성 (예: signOut(), removeToken() 등)
  };

  return (
    <Menu as='div' className='relative font-pretendard text-[14px] font-normal'>
      <MenuButton className='focus:outline-none'>
        <Icon className='text-grayscale-300 cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
      </MenuButton>

      <MenuItems className='absolute right-0 mt-2 w-[140px] text-center text-grayscale-500 bg-grayscale-50 rounded-[10px] shadow-lg z-50'>
        <div className='p-1'>
          {menuItems.map((item, idx) => (
            <MenuItem key={idx}>
              {({ active }) =>
                item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className={clsx(
                      'w-full px-4 py-2 text-sm',
                      active && 'bg-grayscale-100 text-black rounded-[10px]',
                    )}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href ?? '/'}
                    className={clsx(
                      'block px-4 py-2 text-sm',
                      active && 'bg-grayscale-100 text-black rounded-[10px]',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              }
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default HeaderDropdown;
