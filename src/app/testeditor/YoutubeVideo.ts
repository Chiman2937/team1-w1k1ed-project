import { Node, mergeAttributes, NodeViewRendererProps, Command } from '@tiptap/core';

// 타입: 커맨드에서 사용할 속성
export type YoutubeEmbedAttrs = {
  src: string;
  width?: string;
  height?: string;
};

// 옵션 타입: HTML 속성 설정 등
export interface YoutubeEmbedOptions {
  HTMLAttributes: Record<string, string>;
}

// TipTap의 명령 체인 자동완성을 위한 타입 확장
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtubeEmbed: {
      insertYoutubeEmbed: (attrs: YoutubeEmbedAttrs) => ReturnType;
    };
  }
}

// YoutubeEmbed Extension 본체
export const YoutubeVideo = Node.create<YoutubeEmbedOptions>({
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
      src: {
        default: null,
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
        tag: 'iframe[src*="youtube.com"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        frameborder: '0',
        allowfullscreen: 'true',
      }),
    ];
  },

  // NodeView: video-wrapper로 감싸서 선택 스타일 가능하게 함
  addNodeView() {
    return ({ HTMLAttributes }: NodeViewRendererProps) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'video-wrapper';
      wrapper.contentEditable = 'false';

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', HTMLAttributes.src);
      iframe.setAttribute('width', HTMLAttributes.width);
      iframe.setAttribute('height', HTMLAttributes.height);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');

      wrapper.appendChild(iframe);
      return { dom: wrapper };
    };
  },

  // 명령어 등록
  addCommands() {
    return {
      insertYoutubeEmbed:
        (attrs: YoutubeEmbedAttrs): Command =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
