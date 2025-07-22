import { Editor } from '@tiptap/react';

export const handleImageSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  editor: Editor | null,
  setImages: React.Dispatch<React.SetStateAction<Record<string, File>>>,
) => {
  const file = e.target.files?.[0];
  if (!file || !editor) return;

  const imageBlobURL = URL.createObjectURL(file);

  setImages((prev) => ({
    ...prev,
    [imageBlobURL]: file,
  }));

  editor
    .chain()
    .focus()
    .setImage({
      src: imageBlobURL,
      alt: file.name,
      title: file.name,
    })
    .run();
};
