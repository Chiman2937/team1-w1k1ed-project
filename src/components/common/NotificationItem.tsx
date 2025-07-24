import { FaTimes } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';

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
      <div className='w-[328px] px-[12px] py-[16px] rounded-[5px] bg-white '>
        <header className='flex justify-between'>
          <AiFillNotification size={20} />
          <FaTimes
            className='cursor-pointer' // 클릭 가능한 요소임을 표시
            onClick={() => onDelete(id)} // X 아이콘 클릭 시 onDelete 호출
          />
        </header>
        <div>
          <p>내 위키가 수정되었습니다.</p>
          <p>{content}</p> {/* content prop 사용 */}
          <p>{formatTimeAgo(createdAt)}</p> {/* createdAt prop 사용 및 시간 포맷팅 */}
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
