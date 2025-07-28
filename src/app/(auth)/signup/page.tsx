'use client';
import { ToastRender } from 'cy-toast';
import SignupSection from './signUp';
const SignupPage = () => {
  return (
    <>
      <ToastRender />
      <SignupSection />
    </>
  );
};

export default SignupPage;
