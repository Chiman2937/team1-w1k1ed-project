import { WikiCodeRes } from '@/app/wiki/[code]/page';
import clsx from 'clsx';
import ProfileImageViewer from './components/ProfileImageViewer';
import ProfileContentViewer from './components/ProfileContentViewer';
import { useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
interface Props {
  wikiData: WikiCodeRes;
}

const ProfileViewer = ({ wikiData: data }: Props) => {
  const [expand, setExpand] = useState(false);

  const handleExpandClick = () => {
    setExpand(!expand);
  };

  const contentHeight = expand ? 'h-auto' : 'h-[75px] 2xl:h-auto';

  return (
    <div
      className={clsx(
        'bg-grayscale-50 rounded-[10px] shadow-card',
        'pt-[15px] pb-[5px] px-[20px]',
        'md:pt-[20px] md:pb-[5px] md:px-[30px]',
        '2xl:pt-[53px] 2xl:pb-[53px] 2xl:px-[55px] 2xl:w-fit',
        '2xl:absolute 2xl:top-[80px] 2xl:-right-[240px]',
        'flex flex-col',
      )}
    >
      <div
        className={clsx(
          'flex',
          'gap-[20px] flex-row items-start',
          'md:gap-[40px]',
          '2xl:gap-[50px] 2xl:flex-col 2xl:items-strech',
        )}
      >
        <ProfileImageViewer imageUrl={data.image} />
        <div
          className={clsx(contentHeight, '2xl:h-auto overflow-hidden 2xl:overflow-visible grow')}
        >
          <ProfileContentViewer wikiCodeData={data} />
        </div>
      </div>
      <div className={clsx('flex flex-col items-center', 'block 2xl:hidden')}>
        <MdOutlineExpandMore
          className={clsx(
            'text-grayscale-300 cursor-pointer w-[25px] h-[25px]',
            expand && 'scale-y-[-1]',
          )}
          onClick={handleExpandClick}
        />
      </div>
    </div>
  );
};
export default ProfileViewer;
