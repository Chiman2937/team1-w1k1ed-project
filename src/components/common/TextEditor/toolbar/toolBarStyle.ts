import clsx from 'clsx';

const defaultTextColor = 'text-gray-400';
const accentTextColor = 'text-gray-600';
const hoverTextColor = 'hover:text-primary-green-200';
const activeColor = 'bg-gray-100 text-primary-green-200';

export const toolbarStyle = clsx(
  'flex flex-row items-center gap-[8px] flex-wrap',
  'bg-white border-1 border-grayscale-200 shadow-sm',
  'rounded-[15px] py-[5px] px-[20px]',
);

export const toolbarSectionStyle = 'flex flex-row items-center gap-[8px]';

export const seperatorStyle = 'h-[20px] mx-[5px] border-l-1 border-grayscale-200';

export const buttonDefaultStyle = clsx(
  'p-[5px] rounded-[5px] cursor-pointer',
  defaultTextColor,
  hoverTextColor,
);
export const buttonActiveStyle = activeColor;

export const comboBoxContainerDefaultStyle = clsx('font-medium', defaultTextColor);

export const comboBoxButtonDefaultStyle = clsx(
  'h-[25px] w-[80px] bg-white',
  'px-1',
  'flex flex-row justify-between items-center gap-[5px]',
  'cursor-pointer',
  hoverTextColor,
);

export const comboBoxListDefaultStyle = clsx(
  'absolute',
  'flex flex-col',
  'w-[100px] bg-white border-1 border-grayscale-200 shadow-sm',
  'z-1',
);

export const comboBoxListItemDefaultStyle = clsx(
  'px-2 py-1',
  'text-left cursor-pointer',
  hoverTextColor,
);
export const comboBoxListItemSelectedStyle = clsx('bg-grayscale-100', accentTextColor);
