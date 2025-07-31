import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

type NotificationBellProps = {
  notificationsEnabled: boolean;
  hasNewNotifications: boolean;
  onClick: () => void;
};

const NotificationBell = ({
  notificationsEnabled,
  hasNewNotifications,
  onClick,
}: NotificationBellProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className=' relative'
    >
      {notificationsEnabled ? (
        <FaBell
          className='text-gray-300 cursor-pointer 
          w-6 h-6
          md:w-7 md:h-7'
        />
      ) : (
        <div
          className='relative
          w-6 h-6
          md:w-7 md:h-7'
        >
          <FaBell className='text-gray-300 w-full h-full' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-gray-300 rotate-45 ring-2 ring-white'></div>
        </div>
      )}

      {hasNewNotifications && (
        <span
          className='absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-secondary-red-200'
          aria-hidden='true'
        ></span>
      )}
    </motion.button>
  );
};

export default NotificationBell;
