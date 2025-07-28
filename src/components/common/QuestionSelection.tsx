import React from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/common/Input';

interface QuestionSelectionProps {
  selectedQuestion: string | null;
  setSelectedQuestion: (question: string | null) => void;
  customInput: string;
  setCustomInput: (value: string) => void;
  setAnswerInput: (value: string) => void;
  primaryGreen300: string;
  primaryGreen100: string;
  isLoading: boolean;
}

const questions = [
  { emoji: '🥦', text: ['특별히 ', '싫어하는 음식은?'] },
  { emoji: '🐶', text: ['키우고 있는', '반려동물의 이름은?'] },
  { emoji: '🎵', text: ['요즘', '가장 많이 듣는 노래는?'] },
  { emoji: '🍁', text: ['좋아하는 계절은?'] },
];

const QuestionSelection: React.FC<QuestionSelectionProps> = ({
  selectedQuestion,
  setSelectedQuestion,
  customInput,
  setCustomInput,
  setAnswerInput,
  primaryGreen300,
  primaryGreen100,
}) => {
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

  return (
    <>
      {/* '직접 입력하기' 인풋 필드 */}
      <Input
        className='col-span-2'
        placeholder='직접 입력하기'
        name='customQuestion'
        value={customInput}
        onChange={(e) => {
          setCustomInput(e.target.value);
          setSelectedQuestion(e.target.value ? e.target.value : null);
          setAnswerInput('');
        }}
      />

      {/* 사전 정의된 퀴즈 질문 버튼들 렌더링 */}
      {questions.map((q, index) => {
        const isSelected = selectedQuestion === q.text.join('\n');

        return (
          <motion.button
            key={index}
            type='button'
            onClick={() => {
              setCustomInput('');
              setSelectedQuestion(q.text.join('\n'));
              setAnswerInput('');
            }}
            className='relative p-3 bg-white border-[2px] border-primary-green-200 rounded-[10px] text-left text-sm cursor-pointer'
            variants={buttonVariants}
            animate={isSelected ? 'selected' : 'unselected'}
          >
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
    </>
  );
};

export default QuestionSelection;
