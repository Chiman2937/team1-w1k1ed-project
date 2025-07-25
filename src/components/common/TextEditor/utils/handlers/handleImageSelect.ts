import { Editor } from '@tiptap/react';

export const handleImageSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  editor: Editor | null,
  setFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>,
) => {
  const file = e.target.files?.[0];
  if (!file || !editor) return;

  const imageBlobURL = URL.createObjectURL(file);

  setFiles((prev) => ({
    ...prev,
    [imageBlobURL]: file,
  }));

  editor
    ?.chain()
    .focus()
    .insertLocalImage({
      src: imageBlobURL,
      alt: file.name,
    })
    .run();

  e.target.value = '';
};
