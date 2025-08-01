'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { AxiosError } from 'axios';
import { authAPI } from '@/api/authAPI';
import { toast } from 'cy-toast';
import SnackBar from '../../components/common/Snackbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// ----------------------------------------------
// 비밀번호 변경용 zod 스키마 정의
// ----------------------------------------------

const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirmNewPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword'],
  });

// 입력 타입 추론
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ----------------------------------------------
// 비밀번호 변경 폼 컴포넌트
// ----------------------------------------------
const PasswordChangeForm = () => {
  const router = useRouter();

  const {
    register, // input 연결용
    handleSubmit, // form submit handler
    formState: { errors, touchedFields, isValid }, // 폼 에러 상태
    reset, // 폼 필드 초기화 함수 추가
    watch, // 필드 값 감시용
    trigger, // 유효성 검사 수동 트리거용
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur', // blur 시점에 유효성 검사
  });

  // newPassword 필드의 값을 감시합니다.
  const newPassword = watch('newPassword');

  // newPassword 값이 변경될 때마다 confirmNewPassword 필드의 유효성 검사를 트리거합니다.
  useEffect(() => {
    trigger('confirmNewPassword');
  }, [newPassword, trigger]); // newPassword 또는 trigger 함수가 변경될 때마다 실행

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const payload = {
        currentPassword: data.currentPassword,
        password: data.newPassword,
        passwordConfirmation: data.confirmNewPassword,
      };

      const responseData = await authAPI.resetPassword(payload);

      console.log('비밀번호 변경 성공:', responseData);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          비밀번호가 성공적으로 변경되었습니다.
        </SnackBar>
      ));

      reset();
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;

      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류';

      console.error('비밀번호 변경 실패:', errorMessage);
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          비밀번호 변경 실패: {errorMessage}
        </SnackBar>
      ));

      // 500번대 에러(서버 오류)일 경우에만 에러 페이지로 이동
      if (statusCode && statusCode >= 500) {
        router.push('/error');
      }
    }
  };

  return (
    <form
      className='flex flex-col gap-[8px] mx-auto 
      w-[335px] md:w-[400px] transition-all duration-700'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className='w-[335px] md:w-[400px]'
        label='비밀번호 변경'
        type='password'
        placeholder='기존 비밀번호'
        name='currentPassword'
        register={register('currentPassword')}
        errors={errors}
        touchedFields={touchedFields}
      />

      <Input
        className='w-[335px] md:w-[400px]'
        type='password'
        placeholder='새 비밀번호'
        name='newPassword'
        register={register('newPassword')}
        errors={errors}
        touchedFields={touchedFields}
      />

      <Input
        className='w-[335px] md:w-[400px]'
        type='password'
        placeholder='새 비밀번호 확인'
        name='confirmNewPassword'
        register={register('confirmNewPassword')}
        errors={errors}
        touchedFields={touchedFields}
      />

      <div className='flex justify-end mt-[16px]'>
        <Button type='submit' disabled={!isValid}>
          변경하기
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
