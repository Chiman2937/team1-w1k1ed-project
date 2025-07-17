// CopyToClipboard 컴포넌트에 사용되는 상수들 정리
export const COPY_TO_CLIPBOARD_CONFIG = {
  MAX_TEXT_LENGTH: 50,
  DEFAULT_SUFFIX: '...',
  MESSAGES: {
    ERROR: '내 위키 링크 복사에 실패했습니다.',
    SUCCESS: '내 위키 링크가 복사되었습니다.',
  },
} as const;

export const COPY_BUTTON_STYLES = {
  default: 'w-auto h-[26px] text-xs-regular',
  large: 'w-auto h-[30px] text-md-regular',
} as const;

export const COPY_ICON_STYLES = {
  default: 'w-4 h-4',
  large: 'w-5 h-5',
} as const;
