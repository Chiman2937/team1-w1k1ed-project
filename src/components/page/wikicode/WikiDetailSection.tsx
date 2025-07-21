'use client';
import { WikiCodeRes } from '@/app/wiki/[code]/page';
import { useState } from 'react';
import WikiUserEditor from './Editor/Editor';
import WikiViewer from './Viewer/Viewer';

interface Props {
  wikiData: WikiCodeRes;
}

const WikiDetailSection = ({ wikiData }: Props) => {
  const [edit, setEdit] = useState(false);

  const handleToggleClick = () => {
    setEdit(!edit);
  };

  return (
    <>
      {edit ? <WikiUserEditor wikiData={wikiData} /> : <WikiViewer wikiData={wikiData} />}
      <button className='bg-gray-300 p-2 rounded-md mt-4' onClick={handleToggleClick}>
        {edit ? '뷰어로 전환' : '에디터로 전환'}
      </button>
    </>
  );
};

export default WikiDetailSection;
