import { Node, mergeAttributes, Command } from '@tiptap/core';

type LocalVideoAttrs = {
  src: string;
};

interface LocalVideoOptions {
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    localVideo: {
      insertLocalVideo: (attrs: LocalVideoAttrs) => ReturnType;
    };
  }
}

export const LocalVideoExtension = Node.create<LocalVideoOptions>({
  name: 'localVideo',
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
      src: {
        default: null as string | null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-local-video-outer]',
        getAttrs: (node) => {
          if (!(node instanceof HTMLElement)) return false;

          const video = node.querySelector('video');
          if (!(video instanceof HTMLVideoElement)) return false;

          return {
            src: video.getAttribute('src') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src } = HTMLAttributes;

    return [
      'div',
      { 'data-local-video-outer': '', class: 'local-video-outer-wrapper' },
      [
        'div',
        { 'data-local-video-inner': '', class: 'local-video-inner-wrapper' },
        [
          'video',
          mergeAttributes(this.options.HTMLAttributes, {
            src,
            controls: 'true',
          }),
        ],
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const { src } = node.attrs;

      const outerWrapper = document.createElement('div');
      outerWrapper.setAttribute('data-local-video-outer', '');
      outerWrapper.className = 'local-video-outer-wrapper';

      const innerWrapper = document.createElement('div');
      innerWrapper.setAttribute('data-local-video-inner', '');
      innerWrapper.className = 'local-video-inner-wrapper';

      // Object.assign(innerWrapper.style, {
      //   height: '100%',
      //   aspectRatio: '16 / 9',
      //   position: 'relative',
      //   overflow: 'hidden',
      // });

      const video = document.createElement('video');
      video.src = src;
      video.controls = true;

      // Object.assign(video.style, {
      //   width: '100%',
      //   height: '100%',
      //   objectFit: 'cover',
      //   border: '0',
      //   pointerEvents: 'none',
      // });

      innerWrapper.appendChild(video);
      outerWrapper.appendChild(innerWrapper);

      return {
        dom: outerWrapper,
        contentDOM: null,
      };
    };
  },

  addCommands() {
    return {
      insertLocalVideo:
        (attrs: LocalVideoAttrs): Command =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
