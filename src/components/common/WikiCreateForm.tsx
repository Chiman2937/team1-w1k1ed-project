'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import MypageDropdown from './MypageDropdown';

const WikiCreateForm = () => {
  return (
    <form className='flex flex-col gap-[8px] mx-auto'>
      <MypageDropdown label='위키 생성하기' />
      <Input type='text' placeholder='답을 입력해 주세요' name='answer' className='w-auto' />
      <div className='flex justify-end mt-[16px]'>
        <Button type='submit'>생성하기</Button>
      </div>
    </form>
  );
};

export default WikiCreateForm;
