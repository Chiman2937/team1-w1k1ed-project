'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { authAPI } from '@/api/authAPI';
import { useAuthContext } from '@/context/AuthContext';
import { UserData } from '@/types/user';
import CookiesJs from 'js-cookie';
import { toast } from 'cy-toast';
import SnackBar from '@/components/common/Snackbar';
import { IoCheckbox, IoSquareOutline } from 'react-icons/io5';

// 이메일 기억하기 쿠키 이름 정의
const REMEMBER_EMAIL_KEY = 'rememberedEmail';

const loginSchema = z.object({
  email: z.email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(8, '8자 이상 작성해 주세요.'),
  rememberEmail: z.boolean().default(false).optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuthContext();
  const [fromSignupPage, setFromSignupPage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberEmail: false,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('from') === 'signup') {
        setFromSignupPage(true);
      } else {
        setFromSignupPage(false); // from 파라미터가 없으면 초기화
      }
    }
    const rememberedEmail = CookiesJs.get(REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      setValue('email', rememberedEmail, { shouldValidate: true });
      setValue('rememberEmail', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    console.log('폼 제출됨:', data);

    try {
      const { email, password } = data;
      const responseData = await authAPI.signIn({ email, password });
      console.log('로그인 성공:', responseData);

      login(
        responseData.accessToken,
        responseData.refreshToken,
        responseData.user as UserData,
        fromSignupPage,
      );

      // '이메일 기억하기' 로직
      if (data.rememberEmail) {
        // 체크박스가 체크되어 있다면 이메일을 쿠키에 1년(365일) 동안 저장
        CookiesJs.set(REMEMBER_EMAIL_KEY, data.email, { expires: 365 });
      } else {
        // 체크박스가 해제되어 있다면 저장된 이메일 쿠키 삭제
        CookiesJs.remove(REMEMBER_EMAIL_KEY);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류가 발생했습니다.';
      console.error('로그인 실패:', errorMessage);

      toast.run(
        ({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            로그인 실패: {errorMessage}
          </SnackBar>
        ),
        { duration: 2000, closeDuration: 200, openDuration: 200 },
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[50px] mt-[100px]'>
      <h1 className='text-2xl-semibold text-grayscale-500'>로그인</h1>
      <div className='flex flex-col gap-[40px] items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[32px] items-center'>
          <div className='flex flex-col gap-[24px]'>
            <Input
              className='w-[335px] md:w-[400px]'
              label='이메일'
              type='email'
              placeholder='이메일을 입력하세요'
              name='email'
              register={register('email')}
              errors={errors}
              touchedFields={touchedFields}
            />
            <Input
              className='w-[335px] md:w-[400px]'
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력하세요'
              name='password'
              register={register('password')}
              errors={errors}
              touchedFields={touchedFields}
            />
          </div>
          <div className='w-[335px] md:w-[400px] flex items-center gap-[5px] transition-all duration-700'>
            <span
              onClick={() => setValue('rememberEmail', !watch('rememberEmail'))}
              className='cursor-pointer flex items-center justify-center'
            >
              {watch('rememberEmail') ? (
                <IoCheckbox size={20} color='#4cbfa4' />
              ) : (
                <IoSquareOutline size={20} color='#8f95b2' />
              )}
            </span>
            <label htmlFor='rememberEmail' className='text-md-regular text-grayscale-500'>
              이메일 기억하기
            </label>
          </div>
          <Button type='submit' className='flex items-center justify-center w-[335px] md:w-[400px]'>
            로그인
          </Button>
        </form>
        <div className='flex gap-[10px] justify-center items-center'>
          <p className='text-md-regular text-grayscale-400'>아직 회원이 아니신가요?</p>
          <Link href='/signup'>
            <p className='text-md-regular text-primary-green-200'>회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
