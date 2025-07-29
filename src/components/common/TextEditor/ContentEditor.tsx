import { EditorContent, type Editor } from '@tiptap/react';
import ImageAlignToolBar from './textarea/ImageAlignToolBar';

interface Props {
  editor: Editor;
}

const ContentEditor = ({ editor }: Props) => {
  return (
    <div>
      <ImageAlignToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default ContentEditor;
