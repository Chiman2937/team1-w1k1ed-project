import { Node } from '@tiptap/core';

export const YoutubeNode = Node.create({
  name: 'youtubeIframe',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      youtubeId: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-og-link]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { youtubeId } = HTMLAttributes;

    // ✅ YouTube iframe 렌더링

    return [
      'div',
      {
        style: `aspect-ratio: 16/9; width: 100%;`,
      },
      [
        'iframe',
        {
          width: '100%',
          height: '100%',
          src: `https://www.youtube.com/embed/${youtubeId}`,
          title: 'YouTube video player',
          frameborder: '0',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          allowfullscreen: 'true',
        },
      ],
    ];
  },
});
