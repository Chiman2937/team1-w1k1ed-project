import { getMinutesFromSeconds } from '@/utils/time';
import { useEffect, useRef, useState } from 'react';

interface Props {
  registeredAt: string | undefined;
}

const Max_Timer = 10;

const Timer = ({ registeredAt }: Props) => {
  // 남은 수정시간 타이머
  const [timer, setTimer] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 남은 수정시간 계산
  const getRemaingSeconds = (registeredAt: string): number => {
    const past = new Date(registeredAt);
    const now = new Date();
    const diffSeconds = ~~((now.getTime() - past.getTime()) / 1000);
    return Math.max(0, Max_Timer - diffSeconds);
  };

  // 남은 수정시간 카운트다운
  const runCountdown = (): NodeJS.Timeout => {
    return setInterval(() => {
      setTimer((prev) => {
        if (prev === null) return null;
        return prev - 1;
      });
    }, 1000);
  };

  // timer가 0이 되면 TimerIntervalRef 초기화, isTimerFinish true 상태로 전환
  useEffect(() => {
    console.log(`timer 변화 감지: ${timer}`);
    if (!intervalRef.current) return;
    if (timer === null) return;
    if (timer > 0) return;
    clearInterval(intervalRef.current);
    setTimer(null);
  }, [timer]);

  // 수정 상태가 등록되어 registeredAt이 falsy 값이 아니면 timerInterval 실행
  useEffect(() => {
    console.log(`registeredAt 변화 감지: ${registeredAt}`);
    if (!registeredAt) return;
    const remainSeconds = getRemaingSeconds(registeredAt);
    setTimer(remainSeconds);
    intervalRef.current = runCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTimer(null);
      }
    };
  }, [registeredAt]);

  if (!registeredAt === null || timer === null) return;

  return <div>남은시간: {getMinutesFromSeconds(timer)}</div>;
};

export default Timer;
