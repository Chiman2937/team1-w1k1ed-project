type Variant = 'navigation' | 'page';

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean; // 현재 페이지 여부
  variant?: Variant;
  className?: string;
}

const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  variant = 'page',
  className = '',
}: PaginationButtonProps) => {
  // 공통 스타일
  const baseClasses = `
    w-[40px] h-[40px] 
    md:w-[45px] md:h-[45px]
    rounded-[10px] 
    shadow-lg 
    transition-colors 
    text-grayscale-400 
    bg-grayscale-50 
    disabled:text-gray-300 
    disabled:cursor-not-allowed
    flex items-center justify-center
    font-medium
  `;

  // 상태별 스타일
  const getVariantClasses = () => {
    if (variant === 'page' && active) {
      return 'text-primary-green-200';
    }

    if (variant === 'page') {
      return 'hover:bg-gray-200 hover:cursor-pointer';
    }

    // navigation 버튼 (이전/다음)
    return 'bg-gray-50 hover:bg-gray-200 hover:cursor-pointer';
  };

  // 페이지 버튼의 경우 최소 너비 설정
  const sizeClasses = variant === 'page' ? 'min-w-[40px]' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
