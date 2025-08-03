import { EditorContent, type Editor } from '@tiptap/react';
import EditorClickCatcher from './textarea/EditorClickCatcher';
import ImageAlignToolbar from './textarea/ImageAlignToolbar';

interface Props {
  editor: Editor;
}

const ContentEditor = ({ editor }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <ImageAlignToolbar editor={editor} />
      <EditorContent editor={editor} />
      <EditorClickCatcher editor={editor} />
    </div>
  );
};

export default ContentEditor;
