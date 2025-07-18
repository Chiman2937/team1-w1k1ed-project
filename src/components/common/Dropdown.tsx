'use client';

import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import clsx from 'clsx';

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

export default function Dropdown({ iconName = 'hamburger', menuItems }: Props) {
  const Icon = ICONS[iconName];

  const handleLogout = () => {
    console.log('로그아웃');
    // 여기에 실제 로그아웃 처리 로직 작성 (예: signOut(), removeToken() 등)
  };

  return (
    <Menu as='div' className='relative'>
      <Menu.Button className='focus:outline-none'>
        <Icon className='text-gray-300 cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
      </Menu.Button>

      <Menu.Items className='absolute right-0 mt-2 w-[140px] text-center text-grayscale-500 bg-white rounded-[10px] shadow-lg z-50'>
        <div className='p-1'>
          {menuItems.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) =>
                item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className={clsx('w-full px-4 py-2 text-sm', active && 'bg-gray-100 text-black')}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href ?? '/'}
                    className={clsx('block px-4 py-2 text-sm', active && 'bg-gray-100 text-black')}
                  >
                    {item.label}
                  </Link>
                )
              }
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
