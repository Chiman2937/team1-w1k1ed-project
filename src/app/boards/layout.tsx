import { ToastRender } from 'cy-toast';
import React from 'react';

export default function BoardsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className='flex justify-center items-center
    '
    >
      <ToastRender />
      {children}
    </div>
  );
}
