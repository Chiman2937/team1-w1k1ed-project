import { Switch } from '@headlessui/react';
import { useState } from 'react';

const NotificationSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className='flex justify-between items-center text-grayscale-500 text-md-regular'>
      <div>서비스 알림</div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className='group relative flex h-7 w-14 cursor-pointer rounded-full items-center
        p-1 ease-in-out focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white
        border border-grayscale-300 transition-colors duration-200
        data-checked:border-primary-green-200'
      >
        <span
          aria-hidden='true'
          className='pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out
          bg-grayscale-300
          group-data-checked:translate-x-7 group-data-checked:bg-primary-green-200'
        />
      </Switch>
    </div>
  );
};

export default NotificationSwitch;
