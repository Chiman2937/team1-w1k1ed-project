import { ToastRender } from 'cy-toast';

import ModalSection from './ToastSection';

const TestPage = () => {
  return (
    <>
      <ToastRender /> {/*Toast를 사용할 컴포넌트에 ToastRender 렌더링*/}
      <ModalSection />
    </>
  );
};

export default TestPage;
