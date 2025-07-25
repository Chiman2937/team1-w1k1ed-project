'use client';

import Button from '@/components/common/Button';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/common/Input';

const MyPage = () => {
  // 선택된 질문 텍스트를 저장하는 상태 (예: '좋아하는 계절은?')
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  // '직접 입력하기' 필드의 값을 저장하는 상태
  const [customInput, setCustomInput] = useState('');
  // 선택된 질문에 대한 정답 필드의 값을 저장하는 상태
  const [answerInput, setAnswerInput] = useState('');

  // 퀴즈 버튼들을 감싸는 div 요소에 대한 참조 (외부 클릭 감지에 사용)
  const quizButtonsContainerRef = useRef<HTMLDivElement>(null);

  // 사전 정의된 질문 목록
  const questions = [
    { emoji: '🥦', text: ['특별히 ', '싫어하는 음식은?'] },
    { emoji: '🐶', text: ['키우고 있는', '반려동물의 이름은?'] },
    { emoji: '🎵', text: ['요즘', '가장 많이 듣는 노래는?'] },
    { emoji: '🍁', text: ['좋아하는 계절은?'] },
  ];

  const primaryGreen300 = '#32a68a';
  const primaryGreen100 = '#eefff6';

  // 외부 클릭 감지 로직
  // 컴포넌트 마운트 시 이벤트 리스너 추가, 언마운트 시 제거
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 퀴즈 컨테이너 외부를 클릭했는지 확인
      if (
        quizButtonsContainerRef.current &&
        !quizButtonsContainerRef.current.contains(event.target as Node)
      ) {
        // 클릭된 요소가 '직접 입력하기' 또는 '정답' 인풋 필드가 아닌 경우에만 선택 해제
        const targetName = (event.target as HTMLInputElement).name;
        if (targetName !== 'customQuestion' && targetName !== 'answer') {
          setSelectedQuestion(null); // 선택된 질문 해제
          setCustomInput(''); // 직접 입력 필드 초기화
          setAnswerInput(''); // 정답 입력 필드 초기화
        }
      }
    };

    // 문서 전체에 'mousedown' 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [quizButtonsContainerRef]); // quizButtonsContainerRef 변경 시에만 이펙트 재실행

  // 버튼 애니메이션 variants 정의
  const buttonVariants = {
    selected: {
      boxShadow: `0 0 0 4px ${primaryGreen300}B3`,
      backgroundColor: primaryGreen100,
      transition: { type: 'spring' as const, stiffness: 900, damping: 20 },
    },
    unselected: {
      boxShadow: '0 0 0 0px rgba(0, 0, 0, 0)',
      backgroundColor: 'transparent',
      transition: { type: 'spring' as const, stiffness: 900, damping: 20 },
    },
  };

  // 정답 입력 필드 애니메이션을 위한 Framer Motion Variants 정의
  const inputVariants = {
    // 숨겨진 상태: 투명도 0, 높이 0, Y축 -20px 이동
    hidden: { opacity: 0, height: 0, y: -20, transition: { duration: 0.2 } },
    // 보이는 상태: 투명도 1, 높이 자동, Y축 0px 이동
    visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className='font-pretendard'>
      <div
        className='flex flex-col gap-[40px] my-[141px] mx-auto 
        w-[335px] md:w-[400px]'
      >
        <h1 className='font-semibold text-center text-[24px]'>위키생성하기</h1>
        {/* 안내 메시지 섹션 */}
        <div
          className='border-none rounded-[10px] px-[30px] py-[15px] 
          bg-primary-green-100 w-auto
          text-center text-[14px]'
        >
          위키는 계정당 1회만 생성할 수 있습니다.
          <br />
          이미 생성된 위키가 있다면, 해당 위키를 이용해주세요.
        </div>

        <form>
          {/* 폼 필드들을 감싸는 그리드 컨테이너. 외부 클릭 감지를 위한 ref 연결 */}
          <div className='grid grid-cols-2 gap-4' ref={quizButtonsContainerRef}>
            {/* '직접 입력하기' 인풋 필드 (커스텀 Input 컴포넌트 사용) */}
            <Input
              className='col-span-2'
              placeholder='직접 입력하기'
              name='customQuestion'
              value={customInput} // customInput 상태와 연결
              onChange={(e) => {
                setCustomInput(e.target.value);
                setSelectedQuestion(e.target.value ? e.target.value : null);
                setAnswerInput('');
              }}
            />

            {/* 사전 정의된 퀴즈 질문 버튼들 렌더링 */}
            {questions.map((q, index) => {
              // 현재 버튼이 선택되었는지 확인
              const isSelected = selectedQuestion === q.text.join('\n');

              return (
                <motion.button
                  key={index} // 리스트 렌더링을 위한 고유 키
                  type='button' // 폼 제출 방지
                  onClick={() => {
                    setCustomInput(''); // 사전 정의된 질문 선택 시 직접 입력 필드 비움
                    setSelectedQuestion(q.text.join('\n')); // 선택된 질문 업데이트
                    setAnswerInput(''); // 정답 필드 초기화
                  }}
                  className='relative p-3 bg-white border-[2px] border-primary-green-200 rounded-[10px] text-left text-sm cursor-pointer'
                  // 선택 상태에 따른 그림자 애니메이션
                  variants={buttonVariants}
                  animate={isSelected ? 'selected' : 'unselected'}
                >
                  {/* 이모지 (절대 위치) */}
                  <span className='text-xl inline-block mb-3'>{q.emoji}</span>
                  <span className='pl-6'>
                    {q.text.map((line, lineIndex) => (
                      <p key={lineIndex} className='m-0 p-0 leading-tight'>
                        {line}
                      </p>
                    ))}
                  </span>
                </motion.button>
              );
            })}

            {/* 정답 입력 필드: selectedQuestion이 있을 때만 렌더링 및 애니메이션 적용 */}
            <AnimatePresence>
              {selectedQuestion && ( // selectedQuestion 값이 있을 때만 렌더링
                <motion.div
                  key='answer-input-container' // AnimatePresence 자식은 고유 키 필요
                  variants={inputVariants}
                  initial='hidden' // 초기 상태 (숨겨진 상태)
                  animate='visible' // 나타날 때 (보이는 상태로 애니메이션)
                  exit='hidden' // 사라질 때 (숨겨진 상태로 애니메이션)
                  className='col-span-2' // 그리드에서 2칸 차지
                >
                  <Input
                    placeholder={`"${selectedQuestion}"에 대한 정답을 입력해주세요`}
                    name='answer' // 폼 데이터 식별을 위한 이름
                    value={answerInput} // answerInput 상태와 연결
                    onChange={(e) => setAnswerInput(e.target.value)} // answerInput 상태 업데이트
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button className='col-span-2' type='submit'>
              생성하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
