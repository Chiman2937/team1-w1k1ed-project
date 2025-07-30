'use client';
import { ToastRender } from 'cy-toast';
import SignupSection from './signup';
const SignupPage = () => {
  return (
    <>
      <ToastRender />
      <SignupSection />
    </>
  );
};

export default SignupPage;
