'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from '@headlessui/react'; // Headless UI의 Combobox를 사용해서 드롭다운 기능 구현
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // 화살표 아이콘
import clsx from 'clsx'; // 조건부 클래스 이름을 쉽게 붙일 수 있게 도와주는 유틸

// 외부에서 컴포넌트 사용 시 전달할 수 있는 props 타입 정의
interface MypageDropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // label 텍스트 (optional)
}

// 드롭다운 항목으로 사용할 질문 객체 타입
type QuestionItem = {
  id: number;
  content: string;
};

// 드롭다운에서 선택할 수 있는 질문 목록
const questions: QuestionItem[] = [
  { id: 1, content: '특별히 싫어하는 음식은?' },
  { id: 2, content: '키우고 있는 반려동물의 이름은?' },
  { id: 3, content: '직접 입력' }, // 사용자가 직접 입력하는 기능을 위한 항목 (특수처리 대상)
  { id: 4, content: '질문을 선택해주세요' }, // 초기 선택값으로 사용
];

const MypageDropdown = ({ label, id, name, ...rest }: MypageDropdownProps) => {
  // 선택된 값 상태 (초기값은 '질문을 선택해주세요' 항목)
  // string도 들어갈 수 있게 타입 확장함 (직접 입력 시에는 string으로 저장됨)
  const [selected, setSelected] = useState<QuestionItem | string | undefined>(questions[3]);

  // 입력창에 입력되는 텍스트 상태 (검색 필터링과 직접입력에 사용됨)
  // 직접 입력 모드일 때 사용자가 입력한 값을 임시로 저장하는 용도
  const [query, setQuery] = useState('');

  // 사용자가 입력한 query 값에 따라 필터링된 질문 목록 반환
  const filteredQuestions =
    query === ''
      ? questions
      : questions.filter((item) => item.content.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='flex flex-col gap-[10px] font-pretendard'>
      {/* label이 있다면 렌더링 */}
      {label && (
        <label htmlFor={id || name} className='text-md-regular text-grayscale-500'>
          {label}
        </label>
      )}

      {/* Headless UI의 Combobox 컴포넌트: value로 현재 선택된 항목, onChange로 값 변경 제어 */}
      <Combobox<QuestionItem | string>
        value={selected}
        onChange={(value) => {
          if (!value) return;

          // 1. "직접 입력" 항목 (id === 3)이 선택된 경우
          if (typeof value === 'object' && value.id === questions[2].id) {
            // '직접 입력' 객체를 선택된 상태로 유지합니다.
            // 실제 사용자가 입력할 내용은 query 상태에서 관리됩니다.
            setSelected(questions[2]);
            setQuery(''); // 직접 입력을 시작하므로 query를 비웁니다.
          }
          // 2. 문자열이 선택된 경우 (예: 사용자가 "직접 입력" 모드에서 타이핑 후 Enter를 눌렀을 때)
          else if (typeof value === 'string') {
            setSelected(value.trim()); // 사용자가 입력한 커스텀 문자열을 selected에 직접 저장합니다.
            setQuery(''); // 최종 값이 selected에 저장되었으므로 query를 비웁니다.
          }
          // 3. 일반 질문 항목을 선택한 경우
          else if (typeof value === 'object') {
            setSelected(value);
            setQuery('');
          } else {
            setSelected(undefined); // 방어 코드
          }
        }}
        onClose={() => {
          // "직접 입력" 객체가 선택된 상태에서 사용자가 뭔가 입력했다면
          // 그 입력값을 selected에 최종적으로 반영합니다.
          if (
            typeof selected === 'object' &&
            selected.id === questions[2].id &&
            query.trim() !== ''
          ) {
            setSelected(query.trim());
          }
          setQuery(''); // Combobox가 닫힐 때 항상 query를 비웁니다.
        }}
      >
        {/* isOpen: Combobox 내부 드롭다운이 열려 있는지 여부 */}
        {({ open: isOpen }) => (
          <div>
            {/* Combobox 입력창 영역 */}
            <div className='relative'>
              <ComboboxInput
                id={id}
                name={name}
                aria-label='질문 선택' // 접근성
                // 입력창에 표시될 텍스트 정의
                displayValue={(
                  item: QuestionItem | string | number | readonly string[] | null | undefined,
                ) => {
                  if (item === null || item === undefined) return '';
                  if (Array.isArray(item)) return item.map(String).join(', ');
                  // selected 값이 직접 입력된 문자열이라면 그대로 표시합니다.
                  if (typeof item === 'string') return item;
                  if (typeof item === 'number') return String(item);

                  // '직접 입력' 항목이 선택되었고 Combobox가 열려있다면 query를 표시합니다.
                  // 그렇지 않고 Combobox가 닫혀있다면 '직접 입력' 텍스트를 표시합니다.
                  if ('id' in item && item.id === questions[2].id) {
                    return isOpen ? query : item.content;
                  }

                  // 일반 질문 항목이라면 content를 표시합니다.
                  if ('content' in item) return item.content;
                  return '';
                }}
                // 사용자가 타이핑할 때마다 query 상태 업데이트
                onChange={(e) => {
                  // '직접 입력' 항목이 선택된 상태라면 query를 업데이트하여 실시간 입력을 반영합니다.
                  if (typeof selected === 'object' && selected.id === questions[2].id) {
                    setQuery(e.target.value);
                  } else {
                    // 그 외의 경우에는 필터링을 위해 query를 업데이트합니다.
                    setQuery(e.target.value);
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
              {/* 오른쪽 화살표 버튼 */}
              <ComboboxButton className='absolute inset-y-0 right-0 px-2.5'>
                {isOpen ? (
                  <IoIosArrowUp className='size-5 fill-grayscale-400' />
                ) : (
                  <IoIosArrowDown className='size-5 fill-grayscale-400' />
                )}
              </ComboboxButton>
            </div>

            {/* 옵션 목록 */}
            <ComboboxOptions
              anchor='bottom'
              className={clsx(
                'w-[335px] md:w-[400px]',
                'px-[4px] py-[6px] rounded-[10px] bg-grayscale-100',
                'empty:invisible', // 옵션이 없으면 숨김
              )}
            >
              {/* 필터링 결과가 없고 query가 비어있지 않다면 "일치하는 질문 없음" 표시 */}
              {filteredQuestions.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  일치하는 질문이 없습니다.
                </div>
              ) : (
                // 필터링된 질문들을 리스트로 표시
                filteredQuestions.map((item) => (
                  <ComboboxOption
                    key={item.id}
                    value={item}
                    className={clsx(
                      'w-full h-[45px] px-[20px] py-[14px] rounded-[10px]',
                      'text-grayscale-500 text-md-regular',
                      'bg-grayscale-100 placeholder:text-grayscale-400',
                      'border border-transparent cursor-pointer',
                      'data-[focus]:bg-primary-green-100', // 마우스나 키보드로 focus됐을 때
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
