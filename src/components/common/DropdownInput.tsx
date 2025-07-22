type QuestionItem = {
  id: number;
  content: string;
};

import React from 'react';
import { ComboboxInput, ComboboxButton } from '@headlessui/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import clsx from 'clsx';

interface DropdownInputProps {
  id?: string;
  name?: string;
  isOpen: boolean; // Combobox의 open 상태
  selected: QuestionItem | string | undefined; // 'any' 대신 더 구체적인 타입 사용
  query: string; // 현재 query 상태를 받음
  onQueryChange: (value: string) => void; // query를 변경하는 함수
  questions: QuestionItem[]; // 'any[]' 대신 QuestionItem 배열 타입 사용
}

export const DropdownInput = ({
  id,
  name,
  isOpen,
  selected,
  query,
  onQueryChange,
  questions,
  ...rest
}: DropdownInputProps) => {
  const directInputItem = questions.find((q) => q.content === '직접 입력');

  return (
    <div className='relative'>
      <ComboboxInput
        id={id}
        name={name}
        aria-label='질문 선택'
        displayValue={(item: QuestionItem | string | null | undefined) => {
          if (item === null || item === undefined) return '';
          // 배열 타입은 이 컴포넌트에서는 발생하기 어렵지만, ComboboxInput의 기본 타입에 포함될 수 있어 남겨둠
          if (typeof item === 'string') return item;
          if (Array.isArray(item)) return item.map(String).join(', ');
          // 숫자 타입도 발생하기 어렵지만, ComboboxInput의 기본 타입에 포함될 수 있어 남겨둠

          if (typeof item === 'number') return String(item);
          // item이 QuestionItem 타입임을 확신할 수 있을 때 'id'와 'content'에 접근
          if (
            directInputItem &&
            typeof item === 'object' &&
            'id' in item &&
            'content' in item &&
            item.id === directInputItem.id
          ) {
            return isOpen ? query : item.content;
          }

          if (typeof item === 'object' && 'content' in item) return item.content; // 일반 QuestionItem 처리
          return '';
        }}
        onChange={(e) => {
          if (
            directInputItem &&
            typeof selected === 'object' &&
            selected.id === directInputItem.id
          ) {
            onQueryChange(e.target.value);
          } else {
            onQueryChange(e.target.value);
          }
        }}
        className={clsx(
          'w-full h-[45px] px-[20px] py-[14px] rounded-[10px]',
          'bg-grayscale-100 text-grayscale-400 text-md-regular',
          'border border-primary-green-200 focus:outline-none',
          'min-w-[335px] md:min-w-[400px]',
        )}
        {...rest}
      />
      <ComboboxButton className='absolute inset-y-0 right-0 px-2.5'>
        {isOpen ? (
          <IoIosArrowUp className='size-5 fill-grayscale-400' />
        ) : (
          <IoIosArrowDown className='size-5 fill-grayscale-400' />
        )}
      </ComboboxButton>
    </div>
  );
};
