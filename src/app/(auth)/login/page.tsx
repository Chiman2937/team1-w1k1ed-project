'use client';
import React from 'react';
import { useForm } from 'react-hook-form'; // useForm 훅 가져오기
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod'; // Zod 라이브러리 가져오기 (스키마 유효성 검사용)
import { zodResolver } from '@hookform/resolvers/zod'; // Zod 리졸버 가져오기

// 폼 데이터의 유효성 검사를 위한 Zod 스키마 정의
const loginSchema = z
  .object({
    username: z.string().trim().max(10, '열 자 이하로 작성해주세요.'),
    email: z.email('유효한 이메일 주소를 입력해주세요.'),
    password: z.string().min(8, '8자 이상 입력해주세요.'), // 비밀번호는 최소 8자 이상
    confirmPassword: z.string().min(1, '비밀번호가 일치하지 않습니다.'), // 비밀번호 확인은 최소 1자 이상
  })
  .refine((data) => data.password === data.confirmPassword, {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    message: '비밀번호가 일치하지 않습니다.', // 일치하지 않을 때 메시지
    path: ['confirmPassword'], // 에러 메시지가 표시될 필드
  });

// Zod 스키마로부터 폼 데이터의 TypeScript 타입 추론
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register, // 입력 필드를 React Hook Form에 등록하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    formState: { errors }, // 폼의 에러 상태 객체
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Zod 스키마를 유효성 검사기로 사용
    mode: 'onBlur', // 유효성 검사 트리거 모드 설정 (아래에서 자세히 설명)
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('폼 제출됨:', data);
    // 여기에 실제 로그인 로직 (예: API 호출)을 추가하세요.
  };

  return (
    <div>
      <h1>로그인 페이지 테스트</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 p-4 border rounded-lg shadow-md'
      >
        <Input
          label='이름'
          type='text'
          placeholder='이름을 입력하세요'
          name='username'
          variant='S'
          register={register('username')} // 'username' 필드 등록
          errors={errors} // 에러 객체 전달
        />
        <Input
          label='이메일'
          type='email'
          placeholder='이메일을 입력하세요'
          name='email'
          variant='S'
          register={register('email')} // 'email 필드 등록
          errors={errors} // 에러 객체 전달
        />
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호를 입력하세요'
          name='password'
          variant='L'
          register={register('password')} // 'password' 필드 등록
          errors={errors} // 에러 객체 전달
        />
        <Input
          label='비밀번호 확인'
          type='password'
          placeholder='비밀번호를 다시 입력하세요'
          name='confirmPassword'
          variant='L'
          register={register('confirmPassword')} // 'confirmPassword' 필드 등록
          errors={errors} // 에러 객체 전달
        />
        <Button variant='primary' type='submit' className='mt-4'>
          로그인
        </Button>
      </form>
    </div>
  );
}
