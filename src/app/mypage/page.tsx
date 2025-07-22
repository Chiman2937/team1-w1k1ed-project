import PasswordChangeForm from '@/components/common/PasswordChangeForm';
import WikiCreateForm from '@/components/common/WikiCreateForm';

const MyPage = () => {
  return (
    <div className='font-pretendard'>
      <div className='flex flex-col gap-[64px] my-[141px]'>
        <h1 className='font-semibold text-center text-[24px]'>계정 설정</h1>
        <PasswordChangeForm />
        <WikiCreateForm />
      </div>
    </div>
  );
};

export default MyPage;
