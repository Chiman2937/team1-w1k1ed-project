import type { Editor } from '@tiptap/react';

interface Props {
  editor: Editor;
}

const EditorClickCatcher = ({ editor }: Props) => {
  const handleClick = () => {
    if (!editor) return;
    editor.commands.focus('end');
  };
  return <div className='w-full grow cursor-text' onClick={handleClick} />;
};

export default EditorClickCatcher;
