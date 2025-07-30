'use client';

import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import Link from 'next/link';
import { GiHamburgerMenu as IconHamburger } from 'react-icons/gi';
import { VscAccount as IconAccount } from 'react-icons/vsc';
import clsx from 'clsx';

const ICONS = {
  hamburger: IconHamburger,
  account: IconAccount,
};

type DropdownMenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  hasNewNotifications?: boolean;
};

type Props = {
  iconName?: 'hamburger' | 'account';
  menuItems: DropdownMenuItem[];
  onItemClick?: (label: string) => void;
  hasNewNotifications?: boolean;
};

const HeaderDropdown = ({
  iconName = 'hamburger',
  menuItems,
  onItemClick,
  hasNewNotifications,
}: Props) => {
  const Icon = ICONS[iconName];
  const pathname = usePathname();

  return (
    <Menu as='div' className='relative font-pretendard text-[14px] font-normal'>
      <MenuButton
        className='flex items-center justify-center
        focus:outline-none relative'
      >
        <Icon className='text-grayscale-300 cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
        {/* 아이콘 옆에 빨간 점 표시 (hasNewNotifications prop 사용) */}
        {hasNewNotifications && iconName === 'hamburger' && (
          <span
            className='absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-secondary-red-200'
            aria-hidden='true'
          ></span>
        )}
      </MenuButton>

      <MenuItems className='absolute right-0 mt-2 w-[140px] text-center text-grayscale-500 bg-grayscale-50 rounded-[10px] shadow-lg z-50'>
        <div className='p-1'>
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <MenuItem key={idx}>
                {({ active }) => {
                  const commonClass = clsx(
                    'block px-4 py-2 text-sm w-full relative',
                    active && 'bg-grayscale-100 rounded-[10px]',
                    isActive && 'text-primary-green-200 font-bold',
                  );

                  // 메뉴 아이템 렌더링 함수
                  const renderContent = () => (
                    <>
                      {item.label}
                      {/* 메뉴 아이템 옆에 빨간 점 표시 (item.hasNewNotifications 속성 사용) */}
                      {item.hasNewNotifications && (
                        <span
                          className='absolute top-1/3 right-11 -translate-y-1/2 block h-2 w-2 rounded-full ring-1 ring-white bg-secondary-red-200'
                          aria-hidden='true'
                        ></span>
                      )}
                    </>
                  );

                  if (item.onClick) {
                    return (
                      <button onClick={item.onClick} className={commonClass}>
                        {renderContent()}
                      </button>
                    );
                  } else if (item.href) {
                    return (
                      <Link
                        href={item.href}
                        onClick={() => onItemClick?.(item.label)}
                        className={commonClass}
                      >
                        {renderContent()}
                      </Link>
                    );
                  } else {
                    return (
                      <button onClick={() => onItemClick?.(item.label)} className={commonClass}>
                        {renderContent()}
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
