import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ProfileField = ({ children, className }: Props) => {
  return <div className={clsx('flex flex-row gap-[10px] items-center', className)}>{children}</div>;
};

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

const ProfileLabel = ({ children, className }: LabelProps) => {
  return (
    <label
      className={clsx(
        'text-grayscale-400',
        'text-xs-regular w-[60px]',
        'md:text-md-regular md:w-[65px]',
        'xl:text-md-regular xl:w-[70px]',
        'shrink-0',
        className,
      )}
    >
      {children}
    </label>
  );
};

interface LinkProps {
  children: React.ReactNode;
  className?: string;
}

const ProfileLabelLink = ({ children, className }: LinkProps) => {
  return (
    <a
      href={String(children)}
      target='_blank'
      className={clsx(
        'text-grayscale-500 hover:text-primary-green-300 whitespace-nowrap',
        'text-xs-regular',
        'md:text-md-regular',
        'xl:text-md-regular',
        'grow',
        className,
      )}
    >
      {children}
    </a>
  );
};

interface ValueProps {
  children: React.ReactNode;
  className?: string;
}

const ProfileValue = ({ children, className }: ValueProps) => {
  return (
    <label
      className={clsx(
        'text-grayscale-500 whitespace-nowrap',
        'text-xs-regular',
        'md:text-md-regular',
        'xl:text-md-regular',
        'grow',
        className,
      )}
    >
      {children}
    </label>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({ id, className, value, onChange }: InputProps) => {
  return (
    <input
      id={id}
      className={clsx(
        'bg-grayscale-100 rounded-[10px] text-xs-regular px-[16px] py-[10px] w-full',
        'grow',
        'outline-none border-1 border-transparent',
        'focus:border-primary-green-200',
        className,
      )}
      value={value}
      onChange={onChange}
    />
  );
};

ProfileField.label = ProfileLabel;
ProfileField.link = ProfileLabelLink;
ProfileField.value = ProfileValue;
ProfileField.input = ProfileInput;

export default ProfileField;
