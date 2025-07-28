import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx'; // clsx 임포트
import { twMerge } from 'tailwind-merge';
import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
// Font Awesome 아이콘을 사용합니다.
import { LuEye, LuEyeClosed } from 'react-icons/lu';

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
  ...rest
}: InputProps) {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const hasError = !!errorMessage && touchedFields?.[name];

  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const baseStyle = clsx(
    'h-[45px] rounded-[10px] px-[20px] py-[14px]',
    'bg-grayscale-100',
    'text-grayscale-500',
    'text-md-regular',
    'placeholder:text-grayscale-400',
    'border border-transparent',
    'focus:outline-none',
    'focus:border-primary-green-200',
    'transition-all duration-700',
    { 'pr-12': isPasswordType },
  );

  const errorClasses = clsx('bg-secondary-red-100', 'focus:border-secondary-red-200');

  return (
    <div className={twMerge('flex flex-col gap-[10px]', className)}>
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
          className={twMerge(baseStyle, hasError && errorClasses, className)}
          {...register}
          {...rest}
        />
        {/* ✨ ADDED: 비밀번호 타입일 경우에만 아이콘 렌더링 */}
        {isPasswordType && (
          <span
            className='absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer' // ✨ ADDED: 아이콘 위치 조정
            onClick={togglePasswordVisibility} // ✨ ADDED: 클릭 이벤트 핸들러
          >
            {showPassword ? (
              // ✨ ADDED: 눈 뜬 아이콘
              <LuEye size={20} color='#888888' />
            ) : (
              // ✨ ADDED: 눈 감은 아이콘
              <LuEyeClosed size={20} color='#888888' />
            )}
          </span>
        )}
      </div>

      {hasError && <p className='text-xs-regular text-secondary-red-200'>{errorMessage}</p>}
    </div>
  );
}
