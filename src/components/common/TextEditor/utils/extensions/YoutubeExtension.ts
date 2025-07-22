import { Node, mergeAttributes, NodeViewRendererProps, Command } from '@tiptap/core';

export type YoutubeEmbedAttrs = {
  src: string;
};

export interface YoutubeEmbedOptions {
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtubeEmbed: {
      insertYoutubeEmbed: (attrs: YoutubeEmbedAttrs) => ReturnType;
    };
  }
}

export const YoutubeExtension = Node.create<YoutubeEmbedOptions>({
  name: 'youtubeEmbed',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-outer]',
        getAttrs: (node) => {
          if (!(node instanceof HTMLElement)) return false;
          const iframe = node.querySelector('iframe');
          if (!(iframe instanceof HTMLIFrameElement)) return false;

          return {
            src: iframe.getAttribute('src') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src } = HTMLAttributes;

    return [
      'div',
      { 'data-youtube-outer': '', class: 'youtube-outer-wrapper' },
      [
        'div',
        { 'data-youtube-inner': '', class: 'youtube-inner-wrapper' },
        [
          'iframe',
          mergeAttributes(this.options.HTMLAttributes, {
            src,
            frameborder: '0',
            allowfullscreen: 'true',
          }),
        ],
      ],
    ];
  },

  addNodeView() {
    return ({ node }: NodeViewRendererProps) => {
      const { src } = node.attrs;

      const outerWrapper = document.createElement('div');
      outerWrapper.setAttribute('data-youtube-outer', '');
      outerWrapper.className = 'youtube-outer-wrapper';

      const innerWrapper = document.createElement('div');
      innerWrapper.setAttribute('data-youtube-inner', '');
      innerWrapper.className = 'youtube-inner-wrapper';

      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');

      innerWrapper.appendChild(iframe);
      outerWrapper.appendChild(innerWrapper);

      return {
        dom: outerWrapper,
        contentDOM: null,
      };
    };
  },

  addCommands() {
    return {
      insertYoutubeEmbed:
        (attrs: YoutubeEmbedAttrs): Command =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs,
          }),
    };
  },
});
