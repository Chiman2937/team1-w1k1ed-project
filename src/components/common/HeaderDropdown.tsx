'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
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
  onClick?: () => void;
};

type Props = {
  iconName?: 'hamburger' | 'account';
  menuItems: DropdownMenuItem[];
  onItemClick?: (label: string) => void;
};

const HeaderDropdown = ({ iconName = 'hamburger', menuItems, onItemClick }: Props) => {
  const Icon = ICONS[iconName];

  return (
    <Menu as='div' className='relative font-pretendard text-[14px] font-normal'>
      <MenuButton className='focus:outline-none'>
        <Icon className='text-grayscale-300 cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
      </MenuButton>

      <MenuItems className='absolute right-0 mt-2 w-[140px] text-center text-grayscale-500 bg-grayscale-50 rounded-[10px] shadow-lg z-50'>
        <div className='p-1'>
          {menuItems.map((item, idx) => (
            <MenuItem key={idx}>
              {({ active }) => {
                if (item.onClick) {
                  return (
                    <button
                      onClick={item.onClick}
                      className={clsx(
                        'w-full px-4 py-2 text-sm',
                        active && 'bg-grayscale-100 text-black rounded-[10px]',
                      )}
                    >
                      {item.label}
                    </button>
                  );
                } else if (item.href) {
                  return (
                    <Link
                      href={item.href}
                      onClick={() => onItemClick?.(item.label)}
                      className={clsx(
                        'block px-4 py-2 text-sm',
                        active && 'bg-grayscale-100 text-black rounded-[10px]',
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                } else {
                  return (
                    <button
                      onClick={() => onItemClick?.(item.label)}
                      className={clsx(
                        'w-full px-4 py-2 text-sm',
                        active && 'bg-grayscale-100 text-black rounded-[10px]',
                      )}
                    >
                      {item.label}
                    </button>
                  );
                }
              }}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default HeaderDropdown;
