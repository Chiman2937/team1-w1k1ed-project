import React from 'react';

export default function WikiListLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex justify-center items-center'>{children}</div>;
}
