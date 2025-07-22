'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { DropdownOptions } from './DropdownOptions';
import { DropdownInput } from './DropdownInput';

interface MypageDropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

type QuestionItem = {
  id: number;
  content: string;
};

const questions: QuestionItem[] = [
  { id: 1, content: '특별히 싫어하는 음식은?' },
  { id: 2, content: '키우고 있는 반려동물의 이름은?' },
  { id: 3, content: '직접 입력' },
  { id: 4, content: '질문을 선택해주세요' },
];

const MypageDropdown = ({ label, id, name, ...rest }: MypageDropdownProps) => {
  // 초기 selected 값을 questions 배열의 마지막 요소로 설정
  const [selected, setSelected] = useState<QuestionItem | string | undefined>(
    questions[questions.length - 1],
  );
  const [query, setQuery] = useState('');

  const filteredQuestions =
    query === ''
      ? questions
      : questions.filter((item) => item.content.toLowerCase().includes(query.toLowerCase()));

  // '직접 입력' 항목을 배열의 뒤에서 두 번째 인덱스로 참조
  // 이 방법은 '직접 입력' 항목이 항상 이 위치에 있다는 전제가 필수
  const directInputQuestionByIndex = questions[questions.length - 2];

  return (
    <div className='flex flex-col gap-[10px] font-pretendard'>
      {label && (
        <label htmlFor={id || name} className='text-md-regular text-grayscale-500'>
          {label}
        </label>
      )}

      <Combobox<QuestionItem | string>
        value={selected}
        onChange={(value) => {
          if (!value) return;

          // '직접 입력' 항목 `directInputQuestionByIndex`
          if (typeof value === 'object' && value.id === directInputQuestionByIndex.id) {
            setSelected(directInputQuestionByIndex);
            setQuery('');
          } else if (typeof value === 'string') {
            setSelected(value.trim());
            setQuery('');
          } else if (typeof value === 'object') {
            setSelected(value);
            setQuery('');
          } else {
            setSelected(undefined);
          }
        }}
        onClose={() => {
          // '직접 입력' 항목 `directInputQuestionByIndex`
          if (
            typeof selected === 'object' &&
            selected.id === directInputQuestionByIndex.id &&
            query.trim() !== ''
          ) {
            setSelected(query.trim());
          }
          setQuery('');
        }}
      >
        {({ open: isOpen }) => (
          <div>
            <DropdownInput
              id={id}
              name={name}
              isOpen={isOpen}
              selected={selected}
              query={query}
              onQueryChange={setQuery}
              questions={questions}
              {...rest}
            />

            <DropdownOptions filteredQuestions={filteredQuestions} query={query} />
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default MypageDropdown;
