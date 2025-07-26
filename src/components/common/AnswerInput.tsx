import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/common/Input'; // Input 컴포넌트 경로 확인

interface AnswerInputProps {
  selectedQuestion: string | null;
  answerInput: string;
  setAnswerInput: (value: string) => void;
  isLoading: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  selectedQuestion,
  answerInput,
  setAnswerInput,
  isLoading,
}) => {
  const inputVariants = {
    // 숨겨진 상태: 투명도 0, 높이 0, Y축 -20px 이동
    hidden: { opacity: 0, height: 0, y: -20, transition: { duration: 0.2 } },
    // 보이는 상태: 투명도 1, 높이 자동, Y축 0px 이동
    visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {selectedQuestion && (
        <motion.div
          key='answer-input-container'
          variants={inputVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          className='col-span-2'
        >
          <Input
            placeholder={`"${selectedQuestion}"에 대한 정답을 입력해주세요`}
            name='answer' // 폼 데이터 식별을 위한 이름
            value={answerInput} // answerInput 상태와 연결
            onChange={(e) => setAnswerInput(e.target.value)}
            disabled={isLoading} // 로딩 중 비활성화
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerInput;
