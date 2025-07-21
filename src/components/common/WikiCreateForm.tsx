'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const WikiCreateForm = () => {
  return (
    <form className='flex flex-col gap-[8px] mx-auto'>
      <Input
        className='w-[335px] md:w-[400px]'
        label='위키 생성하기'
        type='text'
        placeholder='질문을 입력해 주세요'
        name='question'
      />
      <Input
        className='w-[335px] md:w-[400px]'
        type='text'
        placeholder='답을 입력해 주세요'
        name='answer'
      />
      <div className='flex justify-end mt-[16px]'>
        <Button type='submit'>생성하기</Button>
      </div>
    </form>
  );
};

export default WikiCreateForm;
