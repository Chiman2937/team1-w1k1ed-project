'use client';

import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import ToolBar from '../../components/common/TextEditor/ToolBar';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import { useState } from 'react';
import ContentViewer from '@/components/common/TextEditor/ContentViewer';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';

const TestEditor = () => {
  const { editor, tempFiles, setTempFiles, lengthWithSpace, lengthWithoutSpace } = useTextEditor();
  const [content, setContent] = useState('');

  const handleRenderClick = async () => {
    if (!editor) return;
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    setContent(nextContent);
  };

  if (!editor) return;
  return (
    <div className='p-3 max-w-[960px] mx-auto flex flex-col gap-[20px]'>
      <div>
        <p>
          <span>공백 포함: </span>
          {lengthWithSpace}
        </p>
      </div>
      <div>
        <p>
          <span>공백 제외: </span>
          {lengthWithoutSpace}
        </p>
      </div>
      <ToolBar editor={editor} setTempFiles={setTempFiles} />
      <ContentEditor editor={editor} />
      <button onClick={handleRenderClick}>파싱 시작</button>
      <ContentViewer content={content} />
    </div>
  );
};

export default TestEditor;
