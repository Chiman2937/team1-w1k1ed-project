'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from 'react-responsive';

const loginSchema = z.object({
  email: z.email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '8자 이상 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

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
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className='flex flex-col gap-[32px] items-center'
        >
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
          <Button variant='primary' size={buttonSize} type='submit' className='mt-4'>
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
