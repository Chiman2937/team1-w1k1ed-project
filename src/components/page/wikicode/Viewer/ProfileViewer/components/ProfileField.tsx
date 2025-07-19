import clsx from 'clsx';

interface Props {
  className?: string;
  title: string;
  text: string;
}

const ProfileField = ({ className, title, text }: Props) => {
  return (
    <div className={clsx('flex flex-row gap-[20px]', className)}>
      <span
        className={clsx(
          'text-grayscale-400',
          'text-xs-regular w-[55px]',
          'md:text-md-regular md:w-[60px]',
        )}
      >
        {title}
      </span>
      <span
        className={clsx(
          'text-grayscale-500',
          'text-xs-regular w-[55px]',
          'md:text-md-regular md:w-[60px]',
          'whitespace-nowrap',
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default ProfileField;
