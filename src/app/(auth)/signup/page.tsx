'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // useForm 훅 가져오기
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod'; // Zod 라이브러리 가져오기 (스키마 유효성 검사용)
import { zodResolver } from '@hookform/resolvers/zod'; // Zod 리졸버 가져오기
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import instance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface SignUpSuccessResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    profile: {
      id: number;
      code: string;
    };
  };
}

// 폼 데이터의 유효성 검사를 위한 Zod 스키마 정의
const signUpSchema = z
  .object({
    name: z.string().trim().max(10, '열 자 이하로 작성해주세요.'),
    email: z.email('유효한 이메일 주소를 입력해주세요.'),
    password: z.string().min(8, '8자 이상 입력해주세요.'), // 비밀번호는 최소 8자 이상
    passwordConfirmation: z.string().min(1, '비밀번호가 일치하지 않습니다.'), // 비밀번호 확인은 최소 1자 이상
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    message: '비밀번호가 일치하지 않습니다.', // 일치하지 않을 때 메시지
    path: ['passwordConfirmation'], // 에러 메시지가 표시될 필드
  });

// Zod 스키마로부터 폼 데이터의 TypeScript 타입 추론
type SignUpFormData = z.infer<typeof signUpSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register, // 입력 필드를 React Hook Form에 등록하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    formState: { errors }, // 폼의 에러 상태 객체
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), // Zod 스키마를 유효성 검사기로 사용
    mode: 'onBlur', // 유효성 검사 트리거 모드 설정 (아래에서 자세히 설명)
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log('폼 제출됨:', data);

    try {
      const response = await instance.post<SignUpSuccessResponse>('/auth/signUp', data);
      console.log('회원가입 성공:', response.data);

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      alert('회원가입 성공! 로그인되었습니다.');
      router.push('/login');
    } catch (error) {
      // ⭐️ error를 AxiosError로 타입 단언
      const axiosError = error as AxiosError;
      // error.response가 없는 경우를 대비하여 || axiosError.message도 포함
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류가 발생했습니다.';
      console.error('회원가입 실패:', errorMessage);
      alert(`회원가입 실패: ${errorMessage}`);
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
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[100px]'>
      <h1 className='text-2xl-semibold text-grayscale-500'>회원가입</h1>
      <div className='flex flex-col gap-[40px] items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[30px] items-center'>
          <Input
            label='이름'
            type='text'
            placeholder='이름을 입력하세요'
            name='name'
            variant={inputVariant}
            register={register('name')} // 'username' 필드 등록
            errors={errors} // 에러 객체 전달
          />
          <Input
            label='이메일'
            type='email'
            placeholder='이메일을 입력하세요'
            name='email'
            variant={inputVariant}
            register={register('email')} // 'email 필드 등록
            errors={errors} // 에러 객체 전달
          />
          <Input
            label='비밀번호'
            type='password'
            placeholder='비밀번호를 입력하세요'
            name='password'
            variant={inputVariant}
            register={register('password')} // 'password' 필드 등록
            errors={errors} // 에러 객체 전달
          />
          <Input
            label='비밀번호 확인'
            type='password'
            placeholder='비밀번호를 다시 입력하세요'
            name='passwordConfirmation'
            variant={inputVariant}
            register={register('passwordConfirmation')} // 'confirmPassword' 필드 등록
            errors={errors} // 에러 객체 전달
          />
          <Button
            variant='primary'
            size={buttonSize}
            type='submit'
            className='flex items-center justify-center mt-4'
          >
            회원가입
          </Button>
        </form>
        <div className='flex gap-[10px] justify-center items-center'>
          <p className='text-md-regular text-grayscale-400'>이미 회원이신가요?</p>
          <Link href='/login'>
            <p className='text-md-regular text-primary-green-200'>로그인하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
