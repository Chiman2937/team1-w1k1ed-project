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

  const img = new Image();

  const { from } = editor.state.selection;
  const domAtPos = editor.view.domAtPos(from);
  const container = (domAtPos.node as HTMLElement)?.closest?.(
    '[data-node-view-wrapper], .ProseMirror > *',
  ) as HTMLElement;
  const containerWidth = container?.clientWidth ?? editor.view.dom.clientWidth;

  img.onload = () => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const nextWidth = containerWidth < img.naturalWidth ? containerWidth : img.naturalWidth;
    const nextHeight = nextWidth / aspectRatio;

    editor
      ?.chain()
      .focus()
      .insertLocalImage({
        src: imageBlobURL,
        alt: file.name,
        width: nextWidth,
        height: nextHeight,
      })
      .run();
  };

  img.src = imageBlobURL;

  e.target.value = '';
};
