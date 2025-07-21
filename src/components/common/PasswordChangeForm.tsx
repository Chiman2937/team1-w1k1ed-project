'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface Props {
  isMdUp: boolean;
}

const PasswordChangeForm = ({ isMdUp }: Props) => {
  return (
    <form className='flex flex-col gap-[8px] mx-auto'>
      <Input
        label='비밀번호 변경'
        type='password'
        placeholder='기존 비밀번호'
        name='currentPassword'
        variant={isMdUp ? 'L' : 'S'}
      />
      <Input
        type='password'
        placeholder='새 비밀번호'
        name='newPassword'
        variant={isMdUp ? 'L' : 'S'}
      />
      <Input
        type='password'
        placeholder='새 비밀번호 확인'
        name='confirmNewPassword'
        variant={isMdUp ? 'L' : 'S'}
      />
      <div className='flex justify-end mt-[16px]'>
        <Button type='submit'>변경하기</Button>
      </div>
      <hr className='mt-[32px] border-t border-grayscale-200' />
    </form>
  );
};

export default PasswordChangeForm;
