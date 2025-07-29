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
    'bg-grayscale-100',
    'text-grayscale-500',
    'text-md-regular',
    'placeholder:text-grayscale-400',
    'border border-transparent',
    'focus:outline-none',
    'focus:border-primary-green-200',
    { 'pr-12': isPasswordType },
  );

  const errorClasses = clsx('bg-secondary-red-100', 'focus:border-secondary-red-200');

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
          className={twMerge(baseStyle, hasError && errorClasses)}
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
