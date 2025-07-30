'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // useForm 훅 가져오기
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import * as z from 'zod'; // Zod 라이브러리 가져오기 (스키마 유효성 검사용)
import { zodResolver } from '@hookform/resolvers/zod'; // Zod 리졸버 가져오기
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import { toast } from 'cy-toast';
import SnackBar from '@/components/common/Snackbar';

const signUpSchema = z
  .object({
    name: z.string().trim().max(10, '8자 이하로 작성해주세요.'), //뒤의 랜덤 숫자 2자리를 위해 8자로 수정
    email: z.email('이메일 형식으로 작성해 주세요.'),
    password: z.string().min(8, '8자 이상 입력해주세요.'), // 비밀번호는 최소 8자 이상
    passwordConfirmation: z.string(), // 비밀번호 확인은 최소 1자 이상
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    message: '비밀번호가 일치하지 않습니다.', // 일치하지 않을 때 메시지
    path: ['passwordConfirmation'], // 에러 메시지가 표시될 필드
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

// 이름 + 랜덤 2자리 숫자의 이름 생성 함수
const generateName = (baseName: string): string => {
  const randomNumber = Math.floor(10 + Math.random() * 90); //10부터 99까지의 랜덤 숫자 생성
  return `${baseName}${randomNumber}`; // baseName + 랜덤 숫자 반환
};

export default function SignupSection() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');

  useEffect(() => {
    trigger('passwordConfirmation');
  }, [password, trigger]);

  const onSubmit = async (data: SignUpFormData) => {
    console.log('폼 제출됨:', data);

    const nameForAPI = generateName(data.name);
    console.log('API에 보낼 이름:', nameForAPI);

    try {
      const responseData = await authAPI.signUp({
        name: nameForAPI, //변경된 이름 전달
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      console.log('회원가입 성공:', responseData);

      toast.run(
        ({ isClosing, isOpening, index }) => (
          <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
            가입이 완료되었습니다!
          </SnackBar>
        ),
        { duration: 2000, closeDuration: 200, openDuration: 200 },
      );

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류가 발생했습니다.';
      console.error('회원가입 실패:', errorMessage);

      toast.run(
        ({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            회원가입 실패: {errorMessage}
          </SnackBar>
        ),
        { duration: 2000, closeDuration: 200, openDuration: 200 },
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[70px]'>
      <h1 className='text-2xl-semibold text-grayscale-500'>회원가입</h1>
      <div className='flex flex-col gap-[40px] items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[32px] items-center'>
          <div className='flex flex-col gap-[24px]'>
            <Input
              className='w-[335px] md:w-[400px]'
              label='이름'
              type='text'
              placeholder='이름을 입력하세요'
              name='name'
              register={register('name')}
              errors={errors}
              touchedFields={touchedFields}
            />
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
            <Input
              className='w-[335px] md:w-[400px]'
              label='비밀번호 확인'
              type='password'
              placeholder='비밀번호를 다시 입력하세요'
              name='passwordConfirmation'
              register={register('passwordConfirmation')}
              errors={errors}
              touchedFields={touchedFields}
            />
          </div>
          <Button type='submit' className='flex items-center justify-center w-[335px] md:w-[400px]'>
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
