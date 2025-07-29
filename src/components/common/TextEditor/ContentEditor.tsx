import { EditorContent, type Editor } from '@tiptap/react';
import ImageAlignToolBar from './textarea/ImageAlignToolBar';
import EditorClickCatcher from './textarea/EditorClickCatcher';

interface Props {
  editor: Editor;
}

const ContentEditor = ({ editor }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <ImageAlignToolBar editor={editor} />
      <EditorContent editor={editor} />
      <EditorClickCatcher editor={editor} />
    </div>
  );
};

export default ContentEditor;
