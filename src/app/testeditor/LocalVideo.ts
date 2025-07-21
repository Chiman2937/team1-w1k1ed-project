// extensions/LocalVideo.ts
import { Node, mergeAttributes, Command } from '@tiptap/core';

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
      width: {
        default: '640',
      },
      height: {
        default: '360',
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
      const wrapper = document.createElement('div');
      wrapper.className = 'video-wrapper';

      const video = document.createElement('video');
      video.src = node.attrs.src;
      video.width = parseInt(node.attrs.width);
      video.height = parseInt(node.attrs.height);
      video.controls = true;

      // 핵심 포인트: video 자체가 이벤트를 먹지 않도록 설정
      video.style.pointerEvents = 'none';

      wrapper.appendChild(video);

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
