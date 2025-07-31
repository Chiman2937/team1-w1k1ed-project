import { EditorContent, type Editor } from '@tiptap/react';
import EditorClickCatcher from './textarea/EditorClickCatcher';

interface Props {
  editor: Editor;
}

const ContentEditor = ({ editor }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <EditorContent editor={editor} />
      <EditorClickCatcher editor={editor} />
    </div>
  );
};

export default ContentEditor;
