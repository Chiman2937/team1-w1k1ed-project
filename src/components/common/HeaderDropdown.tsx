'use client';

import { usePathname } from 'next/navigation'; // 추가
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
  onClick?: () => void;
};

type Props = {
  iconName?: 'hamburger' | 'account';
  menuItems: DropdownMenuItem[];
  onItemClick?: (label: string) => void;
};

const HeaderDropdown = ({ iconName = 'hamburger', menuItems, onItemClick }: Props) => {
  const Icon = ICONS[iconName];
  const { logout } = useAuthContext();
  const pathname = usePathname(); // 현재 경로 가져오기

  const _handleLogout = () => {
    console.log('로그아웃');
    logout();
  };

  return (
    <Menu as='div' className='relative font-pretendard text-[14px] font-normal'>
      <MenuButton className='focus:outline-none'>
        <Icon className='text-grayscale-300 cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
      </MenuButton>

      <MenuItems className='absolute right-0 mt-2 w-[140px] text-center text-grayscale-500 bg-grayscale-50 rounded-[10px] shadow-lg z-50'>
        <div className='p-1'>
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <MenuItem key={idx}>
                {({ active }) => {
                  const commonClass = clsx(
                    'block px-4 py-2 text-sm w-full',
                    active && 'bg-grayscale-100 rounded-[10px]',
                    isActive && 'text-primary-green-200 font-bold',
                  );

                  if (item.onClick) {
                    return (
                      <button onClick={item.onClick} className={commonClass}>
                        {item.label}
                      </button>
                    );
                  } else if (item.href) {
                    return (
                      <Link
                        href={item.href}
                        onClick={() => onItemClick?.(item.label)}
                        className={commonClass}
                      >
                        {item.label}
                      </Link>
                    );
                  } else {
                    return (
                      <button onClick={() => onItemClick?.(item.label)} className={commonClass}>
                        {item.label}
                      </button>
                    );
                  }
                }}
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default HeaderDropdown;
