import { FaTimes as IconClose } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

type NotificationItemProps = {
  id: number; // 알림을 식별하기 위한 id 추가
  content: string;
  createdAt: string;
  onDelete: (id: number) => void; // 삭제 핸들러 추가
};

const NotificationItem = ({ id, content, createdAt, onDelete }: NotificationItemProps) => {
  // 시간 표시를 위한 함수 (예시)
  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}초 전`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}시간 전`;
    return `${Math.floor(diffSeconds / 86400)}일 전`;
  };

  return (
    <>
      <div className='w-[330px] px-[12px] py-[16px] rounded-[5px] bg-white text-grayscale-500'>
        <header className='flex justify-end'>
          <IconClose className='cursor-pointer ' onClick={() => onDelete(id)} />
        </header>
        <div className='flex gap-2'>
          <FaBell size={50} className='m-2 p-2 rounded-2xl bg-grayscale-200' />
          <div className='flex flex-col justify-between m-2'>
            <p>{content}</p>
            <p>{formatTimeAgo(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
