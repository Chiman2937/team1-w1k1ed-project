'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from 'react-responsive';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';

const loginSchema = z.object({
  email: z.email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '8자 이상 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter(); //useRouter 훅 초기화
  // const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('폼 제출됨:', data);
    // setIsLoading(true);

    try {
      const responseData = await authAPI.signIn(data);
      console.log('로그인 성공:', responseData);

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);

      alert('로그인 성공!');
      router.push('/');
    } catch (error) {
      // ⭐️ error를 AxiosError로 타입 단언
      const axiosError = error as AxiosError;
      // error.response가 없는 경우를 대비하여 || axiosError.message도 포함
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류가 발생했습니다.';
      console.error('로그인 실패:', errorMessage);
      alert(`로그인 실패: ${errorMessage}`);
    } finally {
      // setIsLoading(false);
    }
  };

  // 👇 hydration mismatch 방지를 위한 마운트 상태
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  // 👇 마운트 전에는 렌더를 생략하거나 기본 사이즈로
  if (!mounted) return null; // 또는 fallback UI

  const inputVariant = isTabletOrDesktop ? 'L' : 'S';
  const buttonSize = isTabletOrDesktop ? 'lg' : 'md';

  return (
    <div className='flex flex-col justify-center items-center gap-[50px] mt-[100px]'>
      <h1 className='text-2xl-semibold text-grayscale-500'>로그인</h1>
      <div className='flex flex-col gap-[40px] items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[32px] items-center'>
          <Input
            label='이메일'
            type='email'
            placeholder='이메일을 입력하세요'
            name='email'
            variant={inputVariant}
            register={register('email')}
            errors={errors}
          />
          <Input
            label='비밀번호'
            type='password'
            placeholder='비밀번호를 입력하세요'
            name='password'
            variant={inputVariant}
            register={register('password')}
            errors={errors}
          />
          <Button
            variant='primary'
            size={buttonSize}
            type='submit'
            className='flex items-center justify-center mt-4'
          >
            로그인
          </Button>
        </form>
        <div>
          <Link href='/signup'>
            <p className='text-md-regular text-primary-green-200'>회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
