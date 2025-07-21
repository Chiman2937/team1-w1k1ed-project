'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from '@headlessui/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import clsx from 'clsx';

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
  { id: 3, content: '직접 입력' }, // 이 항목
  { id: 4, content: '질문 없음' },
];

const MypageDropdown = ({ label, id, name, ...rest }: MypageDropdownProps) => {
  // `selected` 상태에 QuestionItem 객체 또는 직접 입력 문자열을 저장할 수 있도록 타입 확장
  const [selected, setSelected] = useState<QuestionItem | string | undefined>(questions[0]);
  const [query, setQuery] = useState('');

  const filteredQuestions =
    query === '' ? questions : questions.filter((item) => item.content.includes(query));

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
          if (typeof value === 'object' && value.id === questions[2].id) {
            // "직접 입력" 선택 시 selected는 문자열로 설정 (query는 사용자가 직접 입력한 값)
            setSelected(query || '');
          } else if (typeof value === 'object') {
            setSelected(value);
            setQuery('');
          } else if (typeof value === 'string') {
            // 직접 입력된 문자열이 그대로 선택된 경우
            setSelected(value);
          } else {
            setSelected(undefined);
          }
        }}
        onClose={() => {
          if (typeof selected === 'object' && selected.id === questions[2].id) {
            setSelected(query || '');
          }
          setQuery('');
        }}
      >
        {({ open: isOpen }) => (
          <div>
            <div className='relative'>
              <ComboboxInput
                id={id}
                name={name}
                aria-label='질문 선택'
                // displayValue는 QuestionItem, string, number, array 등 모든 가능한 타입을 처리해야 함
                displayValue={(
                  item: QuestionItem | string | number | readonly string[] | null | undefined,
                ) => {
                  if (item === null || item === undefined) {
                    return '';
                  }
                  if (Array.isArray(item)) {
                    return item.map(String).join(', ');
                  }
                  // item이 string 또는 number 타입이면 문자열로 변환하여 반환
                  if (typeof item === 'string' || typeof item === 'number') {
                    return String(item);
                  }
                  // item이 QuestionItem 타입이고, '직접 입력' 항목일 경우 `query`를 표시
                  if ('id' in item && item.id === questions[2].id) {
                    return query; // '직접 입력'이 선택되면 사용자가 입력하는 텍스트(query)를 보여줌
                  }
                  // 그 외 QuestionItem 타입이면 content 반환
                  if ('content' in item) {
                    return item.content;
                  }
                  return '';
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                  // '직접 입력'이 아닌 다른 질문이 선택되어 있을 때,
                }}
                className={clsx(
                  'w-full h-[45px] px-[20px] py-[14px] rounded-[10px]',
                  'bg-grayscale-100 text-grayscale-400 text-md-regular',
                  'border border-primary-green-200 focus:outline-none',
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
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default MypageDropdown;
