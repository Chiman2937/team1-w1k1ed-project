import { EditorContent, type Editor } from '@tiptap/react';

interface Props {
  editor: Editor;
}

const ContentEditor = ({ editor }: Props) => {
  return (
    <div className='px-5'>
      <EditorContent editor={editor} />
    </div>
  );
};

export default ContentEditor;
