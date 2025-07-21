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
  const [query, setQuery] = useState('');

  // 사용자가 입력한 query 값에 따라 필터링된 질문 목록 반환
  const filteredQuestions =
    query === '' ? questions : questions.filter((item) => item.content.includes(query));

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

          // 1. value가 '직접 입력' 항목일 경우 (id === 3)
          if (typeof value === 'object' && value.id === questions[2].id) {
            // 사용자가 아직 아무 것도 입력 안 했을 수도 있음
            setSelected(query.trim() || '직접 입력');
            return;
          }

          // 2. 문자열인 경우 (직접 입력 완료 후 Enter)
          if (typeof value === 'string') {
            setSelected(value.trim());
            return;
          }

          // 3. 일반 질문 항목을 선택한 경우
          if (typeof value === 'object') {
            setSelected(value);
            setQuery('');
            return;
          }

          setSelected(undefined); // 방어 코드
        }}
        onClose={() => {
          // 직접 입력 항목 선택된 상태인데 query가 남아있다면 그것으로 갱신
          if (typeof selected === 'object' && selected.id === questions[2].id) {
            setSelected(query.trim() || '직접 입력');
          }
          // 나머지는 query 초기화만
          setQuery('');
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
                  // 선택된 항목이 null/undefined인 경우 빈 문자열 반환
                  if (item === null || item === undefined) return '';

                  // 여러 항목이 배열로 들어왔을 경우 콤마로 연결
                  if (Array.isArray(item)) return item.map(String).join(', ');

                  // string이나 숫자라면 그대로 출력
                  if (typeof item === 'string' || typeof item === 'number') return String(item);

                  // 선택된 항목이 '직접 입력' 항목이면 query를 표시
                  if ('id' in item && item.id === questions[2].id) return query;

                  // 일반 질문 항목이면 content 출력
                  if ('content' in item) return item.content;

                  // 그 외는 빈 문자열
                  return '';
                }}
                // 사용자가 타이핑할 때마다 query 상태 업데이트
                onChange={(e) => setQuery(e.target.value)}
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
