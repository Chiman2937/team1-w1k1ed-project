import { Editor } from '@tiptap/react';

export const handleLinkSelect = (editor: Editor | null) => {
  if (!editor) return;

  if (editor.isActive('link')) {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  const previousUrl = editor.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  if (url === null) return;

  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  try {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  } catch (e) {
    if (e instanceof Error) {
      alert(e.message);
    } else {
      alert('에러 발생');
    }
  }
};
