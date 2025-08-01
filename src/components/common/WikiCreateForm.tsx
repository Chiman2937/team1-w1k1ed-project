'use client';

import Button from '@/components/common/Button';
import { useState, useRef, useEffect } from 'react';
import { profilesAPI } from '@/api/profile/postProfilesAPI';
import { getProfileItemAPI } from '@/api/profile/getProfileAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import QuestionSelection from '@/components/common/QuestionSelection';
import AnswerInput from '@/components/common/AnswerInput';
import { toast } from 'cy-toast';
import SnackBar from '../../components/common/Snackbar';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const WikiCreateForm = () => {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useAuthContext(); // 로그인된 사용자 정보와 인증 상태 가져오기

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const quizButtonsContainerRef = useRef<HTMLDivElement>(null);

  const primaryGreen300 = '#32a68a';
  const primaryGreen100 = '#eefff6';

  // 페이지 진입 시 기존 위키 존재 여부 확인
  useEffect(() => {
    const checkExistingWiki = async () => {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      if (!isAuthenticated) {
        router.replace('/login');
        return;
      }

      // 프로필 코드가 없는 경우: 위키를 아직 생성하지 않음
      if (!user?.profile?.code) {
        setIsInitialLoading(false); // 로딩 상태 해제 후 위키 생성 폼 렌더링
        return;
      }

      // 프로필 코드가 있는 경우: 위키 존재 여부 확인 API 호출
      try {
        const profile = await getProfileItemAPI({ code: user.profile.code });

        // 기존 위키가 존재할 경우 → 리다이렉트
        if (profile && profile.code) {
          console.log(`기존 위키 발견: ${profile.code}, 리다이렉트합니다.`);
          toast.run(({ isClosing, isOpening, index }) => (
            <SnackBar variant='info' isOpening={isOpening} isClosing={isClosing} index={index}>
              이미 위키가 생성되어있습니다. 위키페이지로 이동합니다.
            </SnackBar>
          ));
          router.replace(`/wiki/${profile.code}`);
        } else {
          // 예외 상황: 프로필에는 code가 없는데 조회는 됨
          router.replace('/error');
          setIsInitialLoading(false);
        }
      } catch (error) {
        // 404: 위키가 없는 정상 케이스 → 폼 표시
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log('기존 위키를 찾을 수 없습니다. 위키 생성 폼을 표시합니다.');
          router.replace('/mypage');
          setIsInitialLoading(false);
        } else {
          // 기타 에러: 서버 오류, 네트워크 오류 등
          console.error('기존 위키 확인 중 오류 발생:', error);
          toast.run(({ isClosing, isOpening, index }) => (
            <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
              서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </SnackBar>
          ));
          setIsInitialLoading(false);
        }
      }
    };

    checkExistingWiki();
  }, [isAuthenticated, user, router]);

  // 외부 클릭 시 질문/답변 입력 초기화
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
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          질문을 선택하거나 직접 입력해주세요.
        </SnackBar>
      ));
      return;
    }

    if (!finalAnswer) {
      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          정답을 입력해주세요.
        </SnackBar>
      ));
      return;
    }

    setIsLoading(true);

    try {
      // 보안 질문 등록 API 호출
      const response = await profilesAPI.createSecurityQuestion({
        securityQuestion: finalQuestion,
        securityAnswer: finalAnswer,
      });
      console.log('API 응답:', response);

      toast.run(({ isClosing, isOpening, index }) => (
        <SnackBar variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          위키가 성공적으로 생성되었습니다!
        </SnackBar>
      ));

      // 입력값 초기화
      setSelectedQuestion(null);
      setCustomInput('');
      setAnswerInput('');

      if (response.id && response.code) {
        // UserProfile 타입에 맞게 객체 생성
        const newProfile = {
          id: response.id,
          code: response.code,
        };
        updateProfile(newProfile); // AuthContext의 user.profile 업데이트
        console.log('AuthContext의 user.profile이 업데이트되었습니다:', newProfile);
      } else {
        console.warn('위키 생성 응답에 유효한 id 또는 code가 없습니다. 프로필 업데이트 건너뜜.');
      }

      // 위키 생성 성공 후 응답에서 받은 code를 사용하여 해당 위키 페이지로 이동
      if (response.code) {
        router.replace(`/wiki/${response.code}`);
      } else {
        // code 없을 경우 → 홈으로 이동
        console.warn('위키 생성 응답에 code가 없습니다. 랜딩 페이지로 이동합니다.');
        router.replace('/');
      }
    } catch (error) {
      // 에러 핸들링: Axios 에러
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('위키 생성 실패 (AxiosError):', errorMessage);
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            위키 생성 실패: {errorMessage}
          </SnackBar>
        ));
      } else if (error instanceof Error) {
        // 일반 자바스크립트 에러
        console.error('위키 생성 실패 (일반 Error):', error.message);
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            위키 생성 실패: {error.message}
          </SnackBar>
        ));
      } else {
        // 알 수 없는 에러
        console.error('위키 생성 실패 (알 수 없는 에러):', error);
        toast.run(({ isClosing, isOpening, index }) => (
          <SnackBar variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
            위키 생성 실패: 알 수 없는 오류가 발생했습니다.
          </SnackBar>
        ));
        router.replace('/error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로딩 중일 때 로딩 스피너 표시
  if (isInitialLoading) {
    return (
      <div className='flex justify-center items-center h-screen font-pretendard'>
        <LoadingSpinner.lineCircle lineWeight={3} distanceFromCenter={6} />
      </div>
    );
  }

  return (
    <div className='font-pretendard'>
      <div
        className='flex flex-col mx-auto gap-5 my-[120px] transition-all duration-700
        w-[335px] md:w-[500px]'
      >
        <Link href='/'>
          <Image src='/images/logo.svg' alt='로고' width={400} height={80} className='mx-auto' />
        </Link>

        {/* 안내 메시지 섹션 */}
        <div
          className='border-none rounded-[10px] px-[5px] py-[15px] 
        bg-primary-green-100 w-auto text-primary-green-300
          text-center text-[10px]
          md:px-[30px] md:text-[14px]'
        >
          <span
            className='font-bold text-[16px] text-center 
          block mb-2
          md:text-[20px]'
          >
            나를 소개하는 작은 우주, 위키를 만들어보세요!
          </span>
          프로필보다 더 깊고, 게시글보다 더 정돈된 <strong>나만의 공간</strong>
          이에요.
          <br />
          친구들과 함께 채워갈 <strong>위키</strong>를 만들어 시작해보세요!!
        </div>

        <form onSubmit={handleSubmit}>
          {/* 질문/답변 입력 필드 */}
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

            <Button
              className='col-span-2 flex items-center justify-center h-[45px] transition-all duration-700'
              type='submit'
            >
              {isLoading ? (
                <LoadingSpinner.lineCircle lineWeight={3} distanceFromCenter={6} />
              ) : (
                '생성하기'
              )}
            </Button>
          </div>
        </form>
        {/* 안내 메시지 섹션 */}
        <p className='text-[14px] text-center text-secondary-red-200'>
          위키는 계정당 1회만 생성할 수 있습니다.
          <br />
          이미 생성된 위키가 있다면, 해당 위키를 이용해주세요.
        </p>
      </div>
    </div>
  );
};

export default WikiCreateForm;
