'use client';

import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import ToolBar from '../../components/common/TextEditor/ToolBar';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import { useState } from 'react';
import ContentViewer from '@/components/common/TextEditor/ContentViewer';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';
import { getHtmlFirstImageSrc } from '@/components/common/TextEditor/utils/handlers/getHtmlFirstImageSrc';

const TestEditor = () => {
  const { editor, tempFiles, setTempFiles, lengthWithSpaces, lengthWithoutSpaces } =
    useTextEditor();
  const [content, setContent] = useState('');

  const handleRenderClick = async () => {
    if (!editor) return;
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    setContent(nextContent);
  };

  const handleGetImageSrcClick = () => {
    if (!editor) return;
    if (!content) {
      alert('HTML파싱을 먼저 진행해주세요.');
    }
    const nextImageSrc = getHtmlFirstImageSrc(content);
    console.log(nextImageSrc);
  };

  if (!editor) return;
  return (
    <div className='p-3 max-w-[960px] mx-auto flex flex-col gap-[20px]'>
      <div>
        <p>
          <span>공백 포함: </span>
          {lengthWithSpaces}
        </p>
      </div>
      <div>
        <p>
          <span>공백 제외: </span>
          {lengthWithoutSpaces}
        </p>
      </div>
      <ToolBar editor={editor} setTempFiles={setTempFiles} />
      <ContentEditor editor={editor} />
      <button onClick={handleRenderClick}>파싱 시작</button>
      <button onClick={handleGetImageSrcClick}>첫번째 이미지 경로 추출</button>
      <ContentViewer content={content} />
    </div>
  );
};

export default TestEditor;
