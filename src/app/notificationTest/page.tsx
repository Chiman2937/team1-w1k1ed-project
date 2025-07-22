// NotificationTest.tsx
'use client';

import Button from '@/components/common/Button';
import NotificationItem from '@/components/common/NotificationItem';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type Item = {
  id: number;
  content: string;
  createdAt: string;
};

const NotificationTest = () => {
  const [list, setList] = useState<Item[]>([
    {
      id: 1,
      content: '첫 번째 알림입니다.',
      createdAt: '2025-07-19T12:39:23.618Z',
    },
    {
      id: 2,
      content: '두 번째 알림이 도착했어요!',
      createdAt: '2025-07-19T12:45:00.000Z',
    },
  ]);

  // 새로운 알림을 추가하는 함수
  const handleAddItem = () => {
    const newItem: Item = {
      id: list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1, // 기존 ID 중 가장 큰 값 + 1 또는 1
      content: `새 알림 ${new Date().toLocaleTimeString()}`, // 현재 시간 포함된 내용
      createdAt: new Date().toISOString(),
    };
    setList([...list, newItem]);
  };

  // 알림을 삭제하는 함수
  const handleDeleteItem = (id: number) => {
    // 해당 ID를 가진 알림을 제외하고 새로운 리스트 생성
    setList((prevList) => prevList.filter((item) => item.id !== id));
    // 실제 API 연동 시, 이 시점에서 서버에 삭제 요청
  };

  return (
    <>
      <div className='p-[16px]'>
        <Button onClick={handleAddItem}>새 알림 추가 (현재: {list.length})</Button>
      </div>

      <div className='bg-primary-green-105 m-[16px] w-[368px] px-[20px] py-[24px] rounded-[10px]'>
        <div className='flex justify-between py-[16px]'>
          <h1>알림 {list.length}개</h1>
          <FaTimes className='cursor-pointer' />{' '}
        </div>
        <div className='flex flex-col gap-[8px] '>
          {list.length > 0 ? (
            list.map((item) => (
              <NotificationItem
                key={item.id}
                id={item.id} // NotificationItem에 id 전달
                content={item.content}
                createdAt={item.createdAt}
                onDelete={handleDeleteItem} // NotificationItem에 삭제 핸들러 전달
              />
            ))
          ) : (
            <p className='text-gray-500 text-center py-[16px] bg-white rounded-[5px]'>음슴</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationTest;

// // NotificationTest.tsx (API 호출 로직 추가)
// 'use client';

// import Button from '@/components/common/Button';
// import NotificationItem from '@/components/common/NotificationItem';
// import { useState, useEffect } from 'react'; // useEffect 추가
// import { FaTimes } from 'react-icons/fa';

// type Item = {
//   id: number;
//   content: string;
//   createdAt: string;
// };

// // API 응답 타입 정의
// type ApiResponse = {
//   totalCount: number;
//   list: Item[];
// };

// const NotificationTest = () => {
//   const [list, setList] = useState<Item[]>([]); // 초기 상태를 빈 배열로 설정
//   const [totalCount, setTotalCount] = useState(0); // totalCount 상태 추가

//   // API 호출 함수 (예시)
//   const fetchNotifications = async () => {
//     try {
//       // 실제 API 엔드포인트로 교체하세요.
//       const response = await fetch('/api/notifications'); // 가상의 API 엔드포인트
//       const data: ApiResponse = await response.json();
//       setTotalCount(data.totalCount);
//       setList(data.list); // API에서 받은 목록으로 업데이트
//     } catch (error) {
//       console.error('Failed to fetch notifications:', error);
//     }
//   };

//   useEffect(() => {
//     // 컴포넌트 마운트 시 최초 1회 호출
//     fetchNotifications();

//     // 5초마다 API 호출 (주기적으로 totalCount 및 목록 확인)
//     const intervalId = setInterval(fetchNotifications, 5000); // 5초 (5000ms)마다 호출

//     // 컴포넌트 언마운트 시 인터벌 정리
//     return () => clearInterval(intervalId);
//   }, []); // 빈 배열은 컴포넌트 마운트/언마운트 시에만 실행

//   // 테스트용 버튼 (API 호출을 대체하는 임시 기능)
//   const handleAddItem = () => {
//     const newItem: Item = {
//       id: list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1, // 기존 ID 중 가장 큰 값 + 1
//       content: `새 알림 ${new Date().toLocaleTimeString()}`,
//       createdAt: new Date().toISOString(),
//     };
//     setList(prevList => [...prevList, newItem]);
//     setTotalCount(prevCount => prevCount + 1);
//   };

//   return (
//     <>
//       <div className='p-4'>
//         <Button onClick={handleAddItem}>totalCount up!!! (현재: {totalCount})</Button> {/* totalCount 사용 */}
//       </div>

//       <div className='bg-green-100 w-[368px] px-[20px] py-[24px] rounded-[10px]'>
//         <div className='flex justify-between py-[16px]'>
//           <h1>알림 {totalCount}개</h1> {/* totalCount 사용 */}
//           <FaTimes />
//         </div>
//         {list.length > 0 ? (
//           list.map((item) => (
//             <NotificationItem key={item.id} content={item.content} createdAt={item.createdAt} />
//           ))
//         ) : (
//           <p>인기빵점~</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotificationTest;
