import clsx from 'clsx';
import IconInfo from '@/assets/icons/icon_snackbar_info.svg';
import IconSuccess from '@/assets/icons/icon_snackbar_success.svg';
import IconError from '@/assets/icons/icon_snackbar_fail.svg';

type Variant = 'info' | 'success' | 'error';

interface Props {
  variant: Variant;
  isClosing: boolean; // 닫히는 중 여부 (true면 닫히는 애니메이션)
  isOpening: boolean; // 열리는 중 여부 (true면 열리는 애니메이션)
  index: number; // 토스트 표시 순서 (최신이 0)
  children: React.ReactNode;
}

const SnackBar = ({ variant, isClosing, isOpening, index, children }: Props) => {
  const iconMap = {
    info: IconInfo,
    success: IconSuccess,
    error: IconError,
  };

  const IconComponent = iconMap[variant];

  const containerStyle = clsx(
    'absolute left-[50%] translate-x-[-50%] whitespace-nowrap',
    'flex flex-row gap-[15px] items-center',
    'rounded-[10px]',
    'text-xs-semibold',
    'md:text-lg-semibold',
    'bottom-[80px] top-auto',
    'md:bottom-auto md:top-[120px]',
    'py-[11px] px-[15px]',
    'md:py-[15px] md:px-[20px]',
    'select-none',
    'transition-all duration-300 ease-in-out',
  );

  const animationStyle = clsx(
    isClosing && index < 3 && 'animation-slide-down-out pointer-events-none',
    isOpening && 'animation-slide-down-in',
    index === 1 && 'translate-y-[10px] scale-90',
    index === 2 && 'translate-y-[15px] scale-80',
    index >= 3 && 'translate-y-[20px] scale-70 opacity-0',
  );

  const variantStyle = {
    info: clsx('bg-grayscale-50 text-grayscale-500', 'w-full'),
    success: clsx(
      'bg-primary-green-100 text-primary-green-300',
      'border-1 border-primary-green-200',
    ),
    error: clsx('bg-red-100 text-secondary-red-200', 'border-1 border-secondary-red-200'),
  };

  return (
    <div className={clsx(containerStyle, variantStyle[variant], animationStyle)}>
      <IconComponent />
      {children}
    </div>
  );
};

export default SnackBar;
