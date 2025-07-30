'use client';
import { ToastRender } from 'cy-toast';
import LoginSection from './signIn';
const LoginPage = () => {
  return (
    <>
      <ToastRender />
      <LoginSection />
    </>
  );
};

export default LoginPage;
