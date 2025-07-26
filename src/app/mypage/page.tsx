import WikiCreateForm from '@/components/common/WikiCreateForm';
import { ToastRender } from 'cy-toast';

const MyPage = () => {
  return (
    <>
      <ToastRender />
      <WikiCreateForm />
    </>
  );
};

export default MyPage;
