import { useAuthContext } from '@/context/AuthContext';
import { useWikiContext } from '@/context/WikiContext';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';
import IconInfo from '@/assets/icons/icon_snackbar_info.svg';
interface Props {
  onTimerFinish: () => void;
}

const WikiInfo = ({ onTimerFinish }: Props) => {
  const { user } = useAuthContext();
  const { isEditing, editingInfo } = useWikiContext();
  const [message, setMessage] = useState<React.ReactNode>('');

  // 메시지 목록

  // 로그아웃 상태일 때 (user === null)
  // 로그인 후 위키에 참여할 수 있습니다.

  // 로그인 상태이면서 수정중인 사람이 없을 때 (!!user && !editingInfo)
  // 위키에 참여할 수 있습니다.

  // 로그인 상태이면서 내가 수정중인 상태이지만 뷰어모드일 때 (!!user && editingInfo.userId === user.id)
  // 위키에 참여할 수 있습니다.

  // 로그인 상태이면서 다른 사람이 수정중일 때 (!!user && editingInfo.userId !== user.id)
  // 앞 사람의 편집이 끝나면 위키 참여가 가능합니다. 남은 시간: #분 #초

  useEffect(() => {
    if (!user && !isEditing) {
      setMessage('로그인 후 위키에 참여할 수 있습니다.');
    } else if (user && !isEditing && !editingInfo) {
      setMessage('위키에 참여할 수 있습니다.');
    } else if (user && !isEditing && editingInfo?.userId === user.id) {
      setMessage('위키에 참여할 수 있습니다.');
    } else if (user && !isEditing && !!editingInfo && editingInfo?.userId !== user.id) {
      setMessage(
        <p className='flex flex-row gap-[4px] flex-wrap'>
          {`다른 유저가 편집 중입니다.`}
          <p className='flex flex-row gap-[4px] flex-wrap'>
            <Timer registeredAt={editingInfo?.registeredAt} onTimerFinish={onTimerFinish} />
            {`뒤에 위키 참여가 가능합니다.`}
          </p>
        </p>,
      );
    } else if (isEditing) {
      setMessage(
        <p className='flex flex-row gap-[4px] flex-wrap'>
          {`편집 중입니다.`}
          <p className='flex flex-row gap-[4px] flex-wrap'>
            <Timer registeredAt={editingInfo?.registeredAt} onTimerFinish={onTimerFinish} />
            {`안에 작업을 완료해주세요.`}
          </p>
        </p>,
      );
    } else {
      setMessage('');
    }
  }, [editingInfo, isEditing, onTimerFinish, user]);

  return (
    <div
      className={clsx(
        'bg-white',
        'flex flex-row gap-[15px] items-center',
        'py-[15px]',
        isEditing && 'sticky top-[60px] md:top-[80px] z-1',
      )}
    >
      <IconInfo className='shrink-0' />
      {message}
    </div>
  );
};

export default WikiInfo;
