import React from 'react';

export default function BoardsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex justify-center items-center'>{children}</div>;
}
