import { twMerge } from 'tailwind-merge';
import clsx from 'clsx'; // clsx 임포트

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg'; // size prop 추가
};

export default function Button({
  children,
  variant = 'primary',
  size = 'sm', // 기본 사이즈를 'sm'로 설정
  className,
  ...props
}: ButtonProps) {
  const isDisabled = props.disabled;

  const baseStyle = clsx(
    'rounded-[10px] text-[14px] font-semibold transition',
    isDisabled ? '' : 'cursor-pointer',
  );

  // variant에 따른 배경색, 폰트 색상, 호버 효과 정의
  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary-green-200 text-white hover:bg-primary-green-300',
    secondary: 'bg-transparent text-primary-green-200 border border-primary-green-200 ',
  };

  // size에 따른 패딩 및 폰트 크기 정의
  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-[20px] py-[8px] h-[40px]', //넓이 : hug (기존 기본값)
    md: 'py-[10.5px] w-[335px] h-[45px]',
    lg: 'py-[10.5px] w-[400px] h-[45px]', // large
  };

  const disabledStyles = clsx('bg-grayscale-300 hover:bg-grayscale-300 ');

  return (
    <button
      {...props}
      className={twMerge(
        clsx(baseStyle, variantStyles[variant], sizeStyles[size], props.disabled && disabledStyles),
        className,
      )}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
