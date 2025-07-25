import PasswordChangeForm from '@/components/common/PasswordChangeForm';

const PasswordChangePage = () => {
  return (
    <>
      <div className='font-pretendard'>
        <div className='flex flex-col gap-[64px] my-[141px]'>
          <h1 className='font-semibold text-center text-[24px]'>비밀번호 재설정</h1>
          <PasswordChangeForm />
        </div>
      </div>
    </>
  );
};

export default PasswordChangePage;
