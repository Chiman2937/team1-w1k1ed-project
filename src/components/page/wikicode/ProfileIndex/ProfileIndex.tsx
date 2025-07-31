import { HtmlHeadingItems } from '@/components/common/TextEditor/utils/handlers/getHtmlHeadings';
import { useWikiContext } from '@/context/WikiContext';
import clsx from 'clsx';

interface Props {
  indexList: HtmlHeadingItems[];
  className?: string;
}

const ProfileIndex = ({ indexList, className }: Props) => {
  const { isEditing } = useWikiContext();

  if (isEditing) return null;

  const handleIndexClick = (id: string | null) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      className={clsx(
        'shrink-0',
        'bg-white rounded-[10px] shadow-card',
        'w-[250px] p-[20px] xl:ml-0',
        className,
      )}
    >
      <p
        className={clsx('text-grayscale-600 mb-[20px]', 'text-xl-semibold', 'md:text-2xl-semibold')}
      >
        목차
      </p>
      {indexList.map((item, index) => {
        return (
          <p
            key={index}
            className={clsx(
              'flex flex-row gap-[4px]',
              'mb-[5px]',
              'hover:text-primary-green-300 text-grayscale-500',
              'text-md-regular',
              'md:text-lg-regular',
            )}
          >
            <span className='text-left cursor-pointer'>{`${item.id?.split('-')[1]}.`}</span>
            <button
              className='text-left cursor-pointer break-all'
              onClick={() => handleIndexClick(item.id)}
            >
              {item.text}
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default ProfileIndex;
