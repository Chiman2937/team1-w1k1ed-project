import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type VariantType = 'primary' | 'secondary';
type SizeType = 'sm' | 'md' | 'lg';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  size?: SizeType;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ children, variant = 'primary', size = 'sm', className, ...props }: Props) => {
  const isDisabled = props.disabled;

  const baseStyle = clsx(
    'rounded-[10px] text-[14px] font-semibold transition',
    isDisabled ? '' : 'cursor-pointer',
  );

  const variantStyles: Record<VariantType, string> = {
    primary: 'bg-primary-green-200 text-white hover:bg-primary-green-300',
    secondary: 'bg-transparent text-primary-green-200 border border-primary-green-200',
  };

  const sizeStyles: Record<SizeType, string> = {
    sm: 'px-[20px] py-[8px] h-[40px]',
    md: 'py-[10.5px] w-[335px] h-[45px]',
    lg: 'py-[10.5px] w-[400px] h-[45px]',
  };

  const disabledStyles = clsx('bg-grayscale-300 hover:bg-grayscale-300');

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
};

export default Button;
