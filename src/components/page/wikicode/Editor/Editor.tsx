import { WikiCodeRes } from '@/app/wiki/[code]/page';
import { ChangeEvent, useState } from 'react';

interface Props {
  wikiData: WikiCodeRes;
}

const WikiUserEditor = ({ wikiData: data }: Props) => {
  const [user, setUser] = useState(data);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <input className='block border-1' onChange={handleInputChange} value={user.city} />
      <input className='block border-1' onChange={handleInputChange} value={user.mbti} />
      <input className='block border-1' onChange={handleInputChange} value={user.job} />
      <input className='block border-1' onChange={handleInputChange} value={user.id} />
      <input className='block border-1' onChange={handleInputChange} value={user.sns} />
      <input className='block border-1' onChange={handleInputChange} value={user.birthday} />
      <input className='block border-1' onChange={handleInputChange} value={user.nickname} />
      <input className='block border-1' onChange={handleInputChange} value={user.bloodType} />
      <input className='block border-1' onChange={handleInputChange} value={user.nationality} />
    </>
  );
};
export default WikiUserEditor;
