import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Link from 'next/link';

type VariantType = 'primary' | 'secondary' | 'landingWhite' | 'landingGray';

// 같이 사용될 베이스 프롭스 타입선언입니다.
interface BaseProps {
  variant?: VariantType;
  className?: string;
  children: React.ReactNode;
}

// 버튼 컴포넌트 전용 타입 (href가 없을 때)
// & 연산자로 BaseProps + HTMLButtonElement 속성을 결합
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

// 링크(앵커) 컴포넌트 전용 타입 (href가 있을 때)
// BaseProps + HTMLAnchorElement 속성을 결합
type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

// 타입별칭 + 유니온을 사용하여 묶어주었습니다
type Props = ButtonProps | AnchorProps;

const Button = ({ children, variant = 'primary', className, href, ...props }: Props) => {
  // 전달받은 props 안에 disabled가 있는지 확인하는 불린형 선언자 (true와 false로 조절 가능합니다)
  // 예시 <Button disabled={false} /> 이면 활성상태가 됩니다
  const isDisabled = 'disabled' in props && props.disabled;

  const baseStyle = clsx(
    'items-center inline-flex rounded-[10px] text-[14px] font-semibold transition-all duration-700',
    isDisabled ? '' : 'cursor-pointer',
  );

  const variantStyles = {
    primary: 'bg-primary-green-200 text-white hover:bg-primary-green-300 px-[20px] py-[11px]', // 기본 스타일입니둥
    secondary: 'bg-transparent text-primary-green-200 border border-primary-green-200',
    landingWhite: 'bg-white text-grayscale-500',
    landingGray: 'bg-grayscale-500 text-white',
  };

  const disabledStyles = clsx('bg-grayscale-300 hover:bg-grayscale-300 ');

  const composedClassName = twMerge(
    clsx(baseStyle, variantStyles[variant], isDisabled && disabledStyles),

    className,
  );

  // 만약 href가 프롭스에 있다면 composedClassName속성이 적용됩니다.
  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
      className={composedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
