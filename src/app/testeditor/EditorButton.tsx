import { HiMiniBold as IconBold } from 'react-icons/hi2';
import { FaItalic as IconItalic } from 'react-icons/fa6';
import { FaUnderline as IconUnderline } from 'react-icons/fa6';
import { FaStrikethrough as IconStrike } from 'react-icons/fa6';
import { MdFormatListBulleted as IconBullet } from 'react-icons/md';
import { HiNumberedList as IconNumber } from 'react-icons/hi2';
import { FaAlignLeft as IconAlignLeft } from 'react-icons/fa6';
import { FaAlignCenter as IconAlignCenter } from 'react-icons/fa6';
import { FaAlignRight as IconAlignRight } from 'react-icons/fa6';
import { FaAlignJustify as IconAlignJustify } from 'react-icons/fa6';
import { MdOutlineImage as IconImage } from 'react-icons/md';
import { MdOutlineVideoCameraFront as IconVideo } from 'react-icons/md';
import { FaLink as IconLink } from 'react-icons/fa';

import { MouseEventHandler } from 'react';

type Variant =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'bullet'
  | 'number'
  | 'left'
  | 'center'
  | 'right'
  | 'justify'
  | 'image'
  | 'video'
  | 'link';

interface Props {
  variant: Variant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const EditorButton = ({ variant, onClick, className }: Props) => {
  const iconMap = {
    bold: IconBold,
    italic: IconItalic,
    underline: IconUnderline,
    strike: IconStrike,
    bullet: IconBullet,
    number: IconNumber,
    left: IconAlignLeft,
    center: IconAlignCenter,
    right: IconAlignRight,
    justify: IconAlignJustify,
    image: IconImage,
    video: IconVideo,
    link: IconLink,
  };

  const IconComponent = iconMap[variant];

  return (
    <button className={className} onClick={onClick}>
      <IconComponent />
    </button>
  );
};

export default EditorButton;
