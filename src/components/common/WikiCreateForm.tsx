'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface Props {
  isMdUp: boolean;
}

const WikiCreateForm = ({ isMdUp }: Props) => {
  return (
    <form className='flex flex-col gap-[8px] mx-auto'>
      <Input
        label='위키 생성하기'
        type='text'
        placeholder='질문을 입력해 주세요'
        name='question'
        variant={isMdUp ? 'L' : 'S'}
      />
      <Input
        type='text'
        placeholder='답을 입력해 주세요'
        name='answer'
        variant={isMdUp ? 'L' : 'S'}
      />
      <div className='flex justify-end mt-[16px]'>
        <Button type='submit'>생성하기</Button>
      </div>
    </form>
  );
};

export default WikiCreateForm;
