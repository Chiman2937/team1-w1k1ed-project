'use client';

import Button from '@/components/common/Button';
import { useState, useRef, useEffect } from 'react';
import { profilesAPI } from '@/api/profile/postProfilesAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import QuestionSelection from '@/components/common/QuestionSelection';
import AnswerInput from '@/components/common/AnswerInput';

const MyPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  // API 로딩 + 에러처리를 위한 스테이트
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const quizButtonsContainerRef = useRef<HTMLDivElement>(null);

  const primaryGreen300 = '#32a68a';
  const primaryGreen100 = '#eefff6';

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quizButtonsContainerRef.current &&
        !quizButtonsContainerRef.current.contains(event.target as Node)
      ) {
        const targetName = (event.target as HTMLInputElement).name;
        if (targetName !== 'customQuestion' && targetName !== 'answer') {
          setSelectedQuestion(null);
          setCustomInput('');
          setAnswerInput('');
          setMessage(null); // 외부 클릭 시 메시지 초기화
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [quizButtonsContainerRef]);

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalQuestion = customInput || selectedQuestion;
    const finalAnswer = answerInput;

    if (!finalQuestion) {
      setMessage('질문을 선택하거나 직접 입력해주세요.');
      return;
    }

    if (!finalAnswer) {
      setMessage('정답을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await profilesAPI.createSecurityQuestion({
        securityQuestion: finalQuestion,
        securityAnswer: finalAnswer,
      });
      console.log('API 응답:', response);
      setMessage('위키가 성공적으로 생성되었습니다!');
      setSelectedQuestion(null);
      setCustomInput('');
      setAnswerInput('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('위키 생성 실패 (AxiosError):', errorMessage);
        setMessage(`위키 생성 실패: ${errorMessage}`);
      } else if (error instanceof Error) {
        console.error('위키 생성 실패 (일반 Error):', error.message);
        setMessage(`위키 생성 실패: ${error.message}`);
      } else {
        console.error('위키 생성 실패 (알 수 없는 에러):', error);
        setMessage('위키 생성 실패: 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
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
          className='border-none rounded-[10px] px-[5px] py-[15px]
          bg-primary-green-100 w-auto
          text-center text-[14px]
          md:px-[30px]'
        >
          위키는 계정당 1회만 생성할 수 있습니다.
          <br />
          이미 생성된 위키가 있다면, 해당 위키를 이용해주세요.
        </div>

        <form onSubmit={handleSubmit}>
          {/* 폼 필드들을 감싸는 그리드 컨테이너. 외부 클릭 감지를 위한 ref 연결 */}
          <div className='grid grid-cols-2 gap-4' ref={quizButtonsContainerRef}>
            <QuestionSelection
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              customInput={customInput}
              setCustomInput={setCustomInput}
              setAnswerInput={setAnswerInput}
              primaryGreen300={primaryGreen300}
              primaryGreen100={primaryGreen100}
              isLoading={isLoading}
            />

            <AnswerInput
              selectedQuestion={selectedQuestion}
              answerInput={answerInput}
              setAnswerInput={setAnswerInput}
              isLoading={isLoading}
            />

            <Button className='col-span-2 flex items-center justify-center' type='submit'>
              {isLoading ? (
                <LoadingSpinner.lineCircle lineWeight={3} distanceFromCenter={6} />
              ) : (
                '생성하기'
              )}
            </Button>

            {message && (
              <div
                className={`col-span-2 text-center text-sm ${
                  message.includes('성공') ? 'text-primary-green-500' : 'text-secondary-red-200'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
