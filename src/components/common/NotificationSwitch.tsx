'use client';

import { Switch } from '@headlessui/react';
import { useNotificationStore } from '@/store/useNotificationStore';
import { toast } from 'cy-toast';
import SnackBar from '../../components/common/Snackbar';

const NotificationSwitch = () => {
  // Zustand 스토어에서 상태와 상태를 업데이트하는 함수를 임포트
  const { notificationsEnabled, setNotificationsEnabled } = useNotificationStore();

  // 스위치 상태 변경을 처리하고 토스트 메시지를 띄우는 새로운 핸들러 함수
  const handleSwitchChange = (newEnabledState: boolean) => {
    // 먼저 Zustand 스토어의 상태를 업데이트
    setNotificationsEnabled(newEnabledState);

    // 토글된 새로운 상태에 따라 메시지를 결정
    const message = !notificationsEnabled
      ? '서비스 알림이 활성화되었습니다.'
      : '서비스 알림이 비활성화되었습니다.';

    const toastVariant = newEnabledState ? 'success' : 'info';

    // 토스트 알림 표시
    toast.run(
      ({ isClosing, isOpening, index }) => (
        <SnackBar variant={toastVariant} isOpening={isOpening} isClosing={isClosing} index={index}>
          {message}
        </SnackBar>
      ),
      {
        duration: 3000,
      },
    );
  };

  return (
    <div
      className='flex justify-between items-center text-grayscale-500 text-md-regular
      w-[335px] md:w-[400px] transition-all duration-700'
    >
      <div>서비스 알림</div>
      <Switch
        checked={notificationsEnabled}
        // `onChange` 핸들러를 새로 만든 `handleSwitchChange` 함수로 연결
        onChange={handleSwitchChange}
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
