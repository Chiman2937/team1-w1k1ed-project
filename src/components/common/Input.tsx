import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx'; // clsx 임포트
import { twMerge } from 'tailwind-merge';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type']; //인풋 타입: text, password, email 등
  placeholder?: string;

  // React Hook Form 통합을 위해 필요한 필수 Props
  name: string;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
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
  ...rest
}: InputProps) {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const hasError = !!errorMessage;

  const baseStyle = clsx(
    'h-[45px] rounded-[10px] px-[20px] py-[14px]',
    'bg-grayscale-100',
    'text-grayscale-500',
    'text-md-regular',
    'placeholder:text-grayscale-400',
    'border border-transparent',
    'focus:outline-none',
    'focus:border-primary-green-200',
  );

  const errorClasses = clsx('bg-secondary-red-100', 'border-secondary-red-100');

  return (
    <div className='flex flex-col gap-[10px]'>
      {label && (
        <label htmlFor={id || name} className='text-md-regular text-grayscale-500'>
          {label}
        </label>
      )}

      <input
        id={id || name}
        type={type}
        placeholder={placeholder}
        className={twMerge(
          baseStyle,
          /*SIZE_CLASSES[variant],*/ hasError && errorClasses,
          className,
        )}
        {...register}
        {...rest}
      />

      {hasError && <p className='text-xs-regular text-secondary-red-200'>{errorMessage}</p>}
    </div>
  );
}
