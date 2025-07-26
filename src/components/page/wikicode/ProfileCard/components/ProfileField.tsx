import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface Props {
  children: React.ReactNode;
}

const ProfileField = ({ children }: Props) => {
  return <div className='flex flex-row gap-[10px] items-center'>{children}</div>;
};

interface LabelProps {
  children: React.ReactNode;
}

const ProfileLabel = ({ children }: LabelProps) => {
  return (
    <label
      className={clsx(
        'text-grayscale-400',
        'text-xs-regular w-[55px]',
        'md:text-xs-regular md:w-[55px]',
      )}
    >
      {children}
    </label>
  );
};

interface ValueProps {
  children: React.ReactNode;
}

const ProfileValue = ({ children }: ValueProps) => {
  return (
    <label className={clsx('text-grayscale-500 whitespace-nowrap', 'text-xs-regular')}>
      {children}
    </label>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({ id, value, onChange }: InputProps) => {
  return (
    <input
      id={id}
      className='bg-grayscale-100 rounded-[10px] text-xs-regular px-[16px] py-[10px] w-full'
      value={value}
      onChange={onChange}
    />
  );
};

ProfileField.label = ProfileLabel;
ProfileField.value = ProfileValue;
ProfileField.input = ProfileInput;

export default ProfileField;
