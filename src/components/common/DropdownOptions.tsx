import React from 'react';
import { ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';

type QuestionItem = {
  id: number;
  content: string;
};

interface DropdownOptionsProps {
  filteredQuestions: QuestionItem[]; // 필터링된 질문 목록을 받음
  query: string; // 현재 query 상태를 받음
}

export const DropdownOptions = ({ filteredQuestions, query }: DropdownOptionsProps) => {
  return (
    <ComboboxOptions
      anchor='bottom'
      className={clsx(
        'w-[335px] md:w-[400px]',
        'px-[4px] py-[6px] rounded-[10px] bg-grayscale-100',
        'empty:invisible',
      )}
    >
      {filteredQuestions.length === 0 && query !== '' ? (
        <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
          일치하는 질문이 없습니다.
        </div>
      ) : (
        filteredQuestions.map((item) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className={clsx(
              'w-full h-[45px] px-[20px] py-[14px] rounded-[10px]',
              'text-grayscale-500 text-md-regular',
              'bg-grayscale-100 placeholder:text-grayscale-400',
              'border border-transparent cursor-pointer',
              'data-[focus]:bg-primary-green-100',
            )}
          >
            {item.content}
          </ComboboxOption>
        ))
      )}
    </ComboboxOptions>
  );
};
