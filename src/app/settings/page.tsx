'use client';

import NotificationSwitch from '@/components/common/NotificationSwitch';
import PasswordChangeForm from '@/components/common/PasswordChangeForm';
import { ToastRender } from 'cy-toast';

const PasswordChangePage = () => {
  return (
    <div>
      <ToastRender />
      <div className='font-pretendard w-[335px] md:w-[400px] mx-auto my-[141px]'>
        <div className='flex flex-col gap-[64px]'>
          <h1 className='font-semibold text-center text-[24px]'>비밀번호 재설정</h1>
          <PasswordChangeForm />
        </div>
        <hr
          className='my-5 border-t border-grayscale-300
          w-[335px] md:w-[400px] transition-all duration-700'
        />
        <NotificationSwitch />
      </div>
    </div>
  );
};

export default PasswordChangePage;
