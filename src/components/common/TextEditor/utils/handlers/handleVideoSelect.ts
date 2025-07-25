import { Editor } from '@tiptap/react';

export const handleVideoSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  editor: Editor | null,
  setFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>,
) => {
  const file = e.target.files?.[0];
  if (!file || !editor) return;

  const videoBlobURL = URL.createObjectURL(file);

  setFiles((prev) => ({
    ...prev,
    [videoBlobURL]: file,
  }));

  editor
    .chain()
    .focus()
    .insertLocalVideo({
      src: videoBlobURL,
    })
    .run();

  e.target.value = '';
};
