'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Nav() {
  const pathname = usePathname();

  // 2개 밖에 없는데 굳이 map 써야 하나? 싶지만 확장 대비로 map 사용
  const menuItems = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
  ];

  return (
    <div className='flex gap-[40px] text-grayscale-500'>
      {menuItems.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx('cursor-pointer', isActive && 'text-primary-green-200 font-bold')}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
