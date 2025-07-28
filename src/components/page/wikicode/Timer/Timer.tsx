import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  registeredAt: string | undefined;
  onTimerFinish: () => void;
}

const Max_Timer = 300;

const Timer = ({ registeredAt, onTimerFinish }: Props) => {
  // 남은 수정시간 타이머
  const [timer, setTimer] = useState<number | null>(null);
  // setInterval 절대 참조 Ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 남은 수정시간 계산
  const getRemaingSeconds = (registeredAt: string): number => {
    const past = new Date(registeredAt);
    const now = new Date();
    const diffSeconds = ~~((now.getTime() - past.getTime()) / 1000);
    return Math.max(0, Max_Timer - diffSeconds);
  };

  // 남은 수정시간 카운트다운
  const runCountdown = useCallback((): NodeJS.Timeout => {
    return setInterval(() => {
      setTimer((prev) => {
        if (prev === null) return null;
        return prev - 1;
      });
    }, 1000);
  }, []);

  // 숫자를 `m분 s초` 로 formatting
  const formatMinutesFromSeconds = (totalSeconds: number) => {
    const minute = ~~(totalSeconds / 60);
    const second = totalSeconds % 60;
    return `${minute}분 ${second}초`;
  };

  // timer가 0이 되면
  // timer null로 전환
  // TimerIntervalRef 초기화 상태로 전환
  // onTimerFinish 실행
  useEffect(() => {
    if (!intervalRef.current) return;
    if (timer === null) return;
    if (timer > 0) return;
    clearInterval(intervalRef.current);
    setTimer(null);
    onTimerFinish();
  }, [timer, onTimerFinish]);

  // 수정 상태가 등록되어 registeredAt이 falsy 값이 아니면 timerInterval 실행
  useEffect(() => {
    // console.log(`registeredAt 변화 감지: ${registeredAt}`);
    if (!registeredAt) return;
    const remainSeconds = getRemaingSeconds(registeredAt);
    setTimer(remainSeconds);
    intervalRef.current = runCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [registeredAt, runCountdown]);

  if (!registeredAt === null || timer === null) return;

  return <p className='text-blue-600'>{formatMinutesFromSeconds(timer)}</p>;
};

export default Timer;
