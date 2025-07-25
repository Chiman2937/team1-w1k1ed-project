import { FaBold as IconBold } from 'react-icons/fa';
import { FaItalic as IconItalic } from 'react-icons/fa';
import { FaUnderline as IconUnderline } from 'react-icons/fa';
import { FaStrikethrough as IconStrike } from 'react-icons/fa';
import { FaListUl as IconBullet } from 'react-icons/fa';
import { FaListOl as IconNumber } from 'react-icons/fa';
import { FaAlignLeft as IconAlignLeft } from 'react-icons/fa';
import { FaAlignCenter as IconAlignCenter } from 'react-icons/fa';
import { FaAlignRight as IconAlignRight } from 'react-icons/fa';
import { FaAlignJustify as IconAlignJustify } from 'react-icons/fa';
import { FaImage as IconImage } from 'react-icons/fa6';
import { FaVideo as IconVideo } from 'react-icons/fa6';
import { FaLink as IconLink } from 'react-icons/fa';
import { FaYoutube as IconYoutube } from 'react-icons/fa';

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
  | 'link'
  | 'youtube';

interface Props {
  variant: Variant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const EditorButton = ({ variant, onClick, className, children }: Props) => {
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
    youtube: IconYoutube,
  };

  const IconComponent = iconMap[variant];

  return (
    <button className={className} onClick={onClick}>
      {children}
      <IconComponent />
    </button>
  );
};

export default EditorButton;
