import LinkIcon from '@/assets/images/icon-link.svg';
import {
  COPY_TO_CLIPBOARD_CONFIG,
  COPY_BUTTON_STYLES,
  COPY_ICON_STYLES,
} from '@/constants/copyToClipboard.constants';
import { truncateText } from '@/utils/truncateText';

type CopyButtonSize = 'default' | 'large';

interface Props {
  /** 복사할 텍스트 */
  text: string;
  /** 성공 메시지 표시 여부 */
  showSuccessMessage?: boolean;
  /** 실패 시 에러 메시지 */
  errorMessage?: string;
  /** 버튼에 표시할 텍스트 (없으면 text 사용) */
  buttonText?: string;
  /** 성공 시 메시지 */
  successMessage?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 버튼 크기 */
  size?: CopyButtonSize;
}

export default function CopyToClipboard({
  text,
  showSuccessMessage = true,
  errorMessage = COPY_TO_CLIPBOARD_CONFIG.MESSAGES.ERROR,
  buttonText,
  successMessage = COPY_TO_CLIPBOARD_CONFIG.MESSAGES.SUCCESS,
  className = '',
  size = 'default',
}: Props) {
  const handleCopyClipBoard = async () => {
    try {
      if (!text.trim()) {
        console.warn('복사할 텍스트가 비어있습니다.');
        return;
      }
      // 클립보드에 복사
      await navigator.clipboard.writeText(text);
      // 성공 메시지 출력
      if (showSuccessMessage) {
        alert(successMessage); // TODO:나중에 스낵바로 변경
      }
    } catch (e) {
      // 실패했을 때 콘솔 및 유저에게 메시지 출력
      console.error('클립보드 복사 실패:', e);
      alert(`${errorMessage}\n\n브라우저에서 수동으로 복사해주세요.`); // TODO:나중에 스낵바로 변경
    }
  };

  const displayText = truncateText(
    buttonText || text,
    COPY_TO_CLIPBOARD_CONFIG.MAX_TEXT_LENGTH,
    COPY_TO_CLIPBOARD_CONFIG.DEFAULT_SUFFIX,
  );

  return (
    <button
      onClick={handleCopyClipBoard}
      className={`
        ${COPY_BUTTON_STYLES[size]}
        flex justify-center items-center gap-[5px]
        rounded-[10px] px-2.5 py-[5px] border-0 
        cursor-pointer bg-primary-green-100 text-primary-green-200
        hover:shadow-md active:shadow-sm
        opacity-100 ${className}
      `}
      // 접근성을 위한 속성 추가
      aria-label={`${buttonText || '링크'} 복사하기`}
      title='클립보드에 복사'
    >
      <LinkIcon className={COPY_ICON_STYLES[size]} aria-hidden='true' />
      {displayText}
    </button>
  );
}
