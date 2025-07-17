import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx'; // clsx 임포트
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputSize = 'S' | 'L';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  inputSize?: InputSize;
  type?: InputHTMLAttributes<HTMLInputElement>['type']; //인풋 타입: text, password, email 등
  placeholder?: string;

  // React Hook Form 통합을 위해 필요한 필수 Props
  name: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

export default function Input({
  label,
  className,
  id,
  inputSize = 'S',
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
    'bg-white',
    'text--color-grayscale-500',
    'text-md-regular',
    'placeholder:text--color-grayscale-400',
    'placeholder:text-md-regular',
  );

  const sizeClasses = {
    S: 'w-[335px]',
    L: 'w-[400px]',
  };

  return (
    <div className='flex flex-col gap-[10px]'>
      {label && (
        <label htmlFor={id || name} className='text-md-regular text--color-grayscale-500'>
          {label}
        </label>
      )}

      <input
        id={id || name}
        type={type}
        placeholder={placeholder}
        className={clsx(baseStyle, sizeClasses[inputSize], className)}
        {...register(name)}
        {...rest}
      />

      {hasError && <p className='text-xs-regular text--color-secondary-red-200'>{errorMessage}</p>}
    </div>
  );
}
