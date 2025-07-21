import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const PasswordChangeForm = () => {
  return (
    <form className='flex flex-col gap-[8px] mx-auto w-[335px] md:w-[400px]'>
      <Input
        label='비밀번호 변경'
        type='password'
        placeholder='기존 비밀번호'
        name='currentPassword'
        className='w-auto'
      />
      <Input type='password' placeholder='새 비밀번호' name='newPassword' className='w-auto' />
      <Input
        type='password'
        placeholder='새 비밀번호 확인'
        name='confirmNewPassword'
        className='w-auto'
      />
      <div className='flex justify-end mt-[16px]'>
        <Button type='submit'>변경하기</Button>
      </div>
      <hr className='mt-[32px] border-t border-grayscale-200' />
    </form>
  );
};

export default PasswordChangeForm;
