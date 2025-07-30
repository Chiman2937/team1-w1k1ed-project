import { useWikiContext } from '@/context/WikiContext';
import clsx from 'clsx';

interface IndexItem {
  level: number;
  text: string;
}

interface Props {
  indexList: IndexItem[];
  className?: string;
}

const ProfileIndex = ({ indexList, className }: Props) => {
  const { isEditing } = useWikiContext();

  if (isEditing) return null;

  return (
    <div
      className={clsx(
        'shrink-0',
        'bg-white rounded-[10px] shadow-card',
        'w-[250px] p-[20px] xl:ml-0',
        className,
      )}
    >
      <p>목차</p>
      {indexList.map((item, index) => (
        <p key={index}>{item.text}</p>
      ))}
    </div>
  );
};

export default ProfileIndex;
