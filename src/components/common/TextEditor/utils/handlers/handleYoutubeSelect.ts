import { Editor } from '@tiptap/react';

const convertYoutubeURLToEmbed = (src: string): string => {
  const url = new URL(src);
  if (url.hostname === 'youtu.be') {
    return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
  }
  if (url.hostname.includes('youtube.com') && url.searchParams.get('v')) {
    return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
  }
  return src; // fallback
};

export function handleYoutubeSelect(editor: Editor | null) {
  if (!editor) return;

  const url = prompt('Enter YouTube URL');
  if (!url) return;

  const embedUrl = convertYoutubeURLToEmbed(url);

  editor
    .chain()
    .focus()
    .insertYoutubeEmbed({
      src: embedUrl,
    })
    .run();
}
