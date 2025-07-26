'use client';
import { useState, memo, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { HiCheck } from 'react-icons/hi2';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { OrderByType } from '@/api/article/getArticlesAPI';

export const ORDER_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'like', label: '좋아요순' },
] as const;

interface BoardsOrderDropdownProps {
  value: OrderByType;
  onChange: (value: OrderByType) => void;
}

const BoardsOrderDropdown = memo(({ value, onChange }: BoardsOrderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = ORDER_OPTIONS.find((opt) => opt.value === value) || ORDER_OPTIONS[0];

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (optionValue: OrderByType) => {
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange],
  );

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        type='button'
        onClick={handleToggle}
        className={clsx(
          'relative',
          'flex items-center justify-between',
          'px-5 py-2.5 w-[140px] h-[45px]',
          'text-md-regular text-grayscale-500',
          'bg-grayscale-100 rounded-[10px]',
          'border border-transparent',
          'hover:bg-grayscale-200 transition-colors',
          'focus:outline-none',
          isOpen && 'border-primary-green-200 bg-white',
        )}
        style={{ cursor: 'pointer' }}
      >
        <span className='pointer-events-none'>{selectedOption.label}</span>
        {isOpen ? (
          <IoMdArrowDropup className='size-5 fill-grayscale-400 pointer-events-none' />
        ) : (
          <IoMdArrowDropdown className='size-5 fill-grayscale-400 pointer-events-none' />
        )}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-[120px] bg-white rounded-[10px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)] py-2 px-2 z-50'>
          {ORDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type='button'
              onClick={() => handleSelect(option.value)}
              className={clsx(
                'w-full relative',
                'px-4 py-3 rounded-[8px]',
                'text-md-regular text-left',
                'transition-all duration-150',
                'flex items-center justify-between',
                'hover:bg-primary-green-50',
                option.value === value && 'text-primary-green-200 font-semibold',
                option.value !== value && 'text-grayscale-500',
              )}
              style={{ cursor: 'pointer' }}
            >
              <span className='pointer-events-none'>{option.label}</span>
              {option.value === value && (
                <HiCheck className='size-4 text-primary-green-200 pointer-events-none' />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

BoardsOrderDropdown.displayName = 'BoardsOrderDropdown';

export default BoardsOrderDropdown;
