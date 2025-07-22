// extensions/LocalVideo.ts
import { Node, mergeAttributes, Command } from '@tiptap/core';
import { createWrapperElement } from '../nodeWrapper/createWrapperElement';

type LocalVideoAttrs = {
  src: string;
  width?: string;
  height?: string;
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

export const LocalVideo = Node.create<LocalVideoOptions>({
  name: 'localVideo',
  group: 'block',
  draggable: true,
  atom: true,
  selectable: true,

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
        tag: 'video[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'video',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        controls: 'true',
      }),
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const video = document.createElement('video');
      video.src = node.attrs.src;
      video.controls = true;

      Object.assign(video.style, {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        border: '0',
        pointerEvents: 'none',
      });

      const wrapper = createWrapperElement('div', {
        className: 'video-wrapper',
        style: {
          width: '100%',
          aspectRatio: '16 / 9',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [video],
      });

      return {
        dom: wrapper,
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
