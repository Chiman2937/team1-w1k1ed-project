import clsx from 'clsx';

export const toolbarStyle = clsx(
  'flex flex-row items-center gap-[10px]',
  'bg-grayscale-100 rounded-[10px] py-[10px] px-[30px]',
);

export const buttonDefaultStyle = clsx(
  'p-[5px] rounded-[5px] cursor-pointer',
  'text-grayscale-400 hover:text-grayscale-500',
);
export const buttonActiveStyle = 'bg-grayscale-200';

export const comboBoxContainerDefaultStyle = 'font-medium text-grayscale-400';

export const comboBoxButtonDefaultStyle = clsx(
  'h-[20px] w-[80px] bg-grayscale-100',
  'px-1',
  'flex flex-row justify-between items-center gap-[5px]',
  'cursor-pointer',
);

export const comboBoxListDefaultStyle = clsx(
  'absolute',
  'flex flex-col',
  'w-[80px] bg-grayscale-50 border-1 border-grayscale-200 shadow-lg',
  'z-1',
);

export const comboBoxListItemDefaultStyle = clsx('px-1 py-1', 'text-left cursor-pointer');
export const comboBoxListItemSelectedStyle = clsx('bg-grayscale-100 text-grayscale-500');
