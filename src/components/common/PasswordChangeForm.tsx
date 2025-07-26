'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { AxiosError } from 'axios';
import { authAPI } from '@/api/authAPI';
import { toast } from 'cy-toast';
import SnackBar from '../../components/common/Snackbar'; // SnackBar 컴포넌트 임포트

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
    message: '새 비밀번호가 일치하지 않음',
    path: ['confirmNewPassword'],
  });

// 입력 타입 추론
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ----------------------------------------------
// 비밀번호 변경 폼 컴포넌트
// ----------------------------------------------
const PasswordChangeForm = () => {
  const {
    register, // input 연결용
    handleSubmit, // form submit handler
    formState: { errors, touchedFields }, // 폼 에러 상태
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur', // blur 시점에 유효성 검사
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // API 스펙에 맞춰 필드명 정리
      const payload = {
        currentPassword: data.currentPassword,
        password: data.newPassword,
        passwordConfirmation: data.confirmNewPassword,
      };

      const responseData = await authAPI.resetPassword(payload);

      console.log('비밀번호 변경 성공:', responseData);
      // alert 대신 성공 토스트 메시지 표시
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          비밀번호가 성공적으로 변경되었습니다.
        </SnackBar>
      ));
    } catch (error) {
      const axiosError = error as AxiosError;

      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        '알 수 없는 오류';

      console.error('비밀번호 변경 실패:', errorMessage);
      // alert 대신 실패 토스트 메시지 표시
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          비밀번호 변경 실패: {errorMessage}
        </SnackBar>
      ));
    }
  };

  return (
    <form className='flex flex-col gap-[8px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
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
        <Button type='submit'>변경하기</Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
