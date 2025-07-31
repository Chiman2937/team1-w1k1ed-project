import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx'; // clsx 임포트
import { twMerge } from 'tailwind-merge';
import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { LuEye as IconEyeOpen, LuEyeClosed as IconEyeClosed } from 'react-icons/lu';

type TouchedFieldsType<TFieldValues extends FieldValues> = {
  [K in keyof TFieldValues]?: boolean;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type']; //인풋 타입: text, password, email 등
  placeholder?: string;

  // React Hook Form 통합을 위해 필요한 필수 Props
  name: string;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  touchedFields?: TouchedFieldsType<FieldValues>;
  forceShowError?: boolean;
}

export default function Input({
  label,
  className,
  id,
  type,
  placeholder,
  name,
  register,
  errors,
  touchedFields,
  forceShowError = false,
  ...rest
}: InputProps) {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const hasError = !!errorMessage && (forceShowError || touchedFields?.[name]);

  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === 'password';

  const passwordIconMap = {
    true: IconEyeOpen,
    false: IconEyeClosed,
  };

  const IconEye = passwordIconMap[`${showPassword}`];

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const baseStyle = clsx(
    'w-full h-[45px] rounded-[10px] px-[20px] py-[14px]',
    'text-grayscale-500',
    'text-md-regular',
    'placeholder:text-grayscale-400',
    'focus:outline-none',
    { 'pr-12': isPasswordType },
  );

  const dynamicBgAndBorderStyles = clsx(
    // 기본 (에러 아닐 때) 스타일
    {
      'bg-grayscale-100': !hasError,
      'bg-secondary-red-100': hasError, // ✨ 에러일 때 빨간색 배경
    },
    'border', // 기본 보더 (border-transparent vs border-red-200)
    {
      'border-transparent': !hasError, // 에러가 아닐 때 투명 보더
      'border-secondary-red-200': hasError, // 에러일 때 빨간색 보더
    },
    // Focus 스타일: 에러 여부에 따라 명확하게 분리
    {
      // 에러가 아닐 때의 포커스 스타일
      'focus:border-primary-green-200': !hasError,
    },
    {
      // 에러일 때의 포커스 스타일 (이게 우선순위를 가져가야 함)
      'focus:border-secondary-red-200': hasError,
    },
  );

  return (
    <div className={twMerge('flex flex-col gap-[10px] transition-all duration-700', className)}>
      {label && (
        <label htmlFor={id || name} className='text-md-regular text-grayscale-500'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          id={id || name}
          type={isPasswordType && showPassword ? 'text' : type}
          placeholder={placeholder}
          className={twMerge(baseStyle, dynamicBgAndBorderStyles)}
          {...register}
          {...rest}
        />
        {isPasswordType && (
          <span
            className='absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            <IconEye size={20} color='#888888' />
          </span>
        )}
      </div>

      {hasError && <p className='text-xs-regular text-secondary-red-200'>{errorMessage}</p>}
    </div>
  );
}
