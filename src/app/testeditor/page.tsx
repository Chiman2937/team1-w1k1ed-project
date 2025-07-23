'use client';

import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import ToolBar from '../../components/common/TextEditor/ToolBar';
import { EditorContent } from '@tiptap/react';

const TestEditor = () => {
  const { editor } = useTextEditor();
  if (!editor) return;
  return (
    <div className='p-3 max-w-[960px] mx-auto flex flex-col gap-[20px]'>
      <ToolBar editor={editor} />
      {/* Text Area 컴포넌트 */}
      <div className='px-5'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TestEditor;
