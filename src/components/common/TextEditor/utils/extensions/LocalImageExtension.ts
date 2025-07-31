import { mergeAttributes, Node } from '@tiptap/core';

export interface LocalImageOptions {
  HTMLAttributes: Record<string, HTMLImageElement>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    localImage: {
      insertLocalImage: (attrs: {
        src: string;
        alt?: string;
        width: number;
        height: number;
      }) => ReturnType;
      setImageAlign: (align: 'left' | 'center' | 'right') => ReturnType;
    };
  }
}

export const LocalImageExtension = Node.create<LocalImageOptions>({
  name: 'localImage',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: null },
      height: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-image-outer]',
        getAttrs: (node) => {
          const el = node as HTMLElement;
          const img = el.querySelector('img');
          return {
            src: img?.getAttribute('src'),
            alt: img?.getAttribute('alt') ?? '',
            width: img?.getAttribute('width') ? parseInt(img.getAttribute('width')!) : null,
            height: img?.getAttribute('height') ? parseInt(img.getAttribute('height')!) : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { width, height, src, alt } = HTMLAttributes;
    const aspectRatio = width && height ? `${width} / ${height}` : undefined;

    return [
      'div',
      {
        'data-image-outer': '',
        class: 'image-outer-wrapper',
      },
      [
        'div',
        { 'data-image-inner': '', class: 'image-inner-wrapper', style: 'position: relative;' },
        [
          'img',
          mergeAttributes({
            src,
            alt,
            width: String(width),
            style: `${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}`,
          }),
        ],
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const outer = document.createElement('div');
      outer.className = 'image-outer-wrapper';
      outer.setAttribute('data-image-outer', '');
      outer.contentEditable = 'false';

      const inner = document.createElement('div');
      inner.className = 'image-inner-wrapper';
      inner.setAttribute('data-image-inner', '');
      inner.style.position = 'relative';

      const img = document.createElement('img');
      img.setAttribute('src', node.attrs.src);
      if (node.attrs.alt) img.setAttribute('alt', node.attrs.alt);
      const { width, height } = node.attrs;

      const aspectRatio = width && height ? `${width} / ${height}` : null;

      if (width) {
        img.setAttribute('width', String(width));
      }

      if (aspectRatio) {
        img.style.aspectRatio = aspectRatio;
      }

      inner.appendChild(img);
      outer.appendChild(inner);

      return {
        dom: outer,
        contentDOM: null,
      };
    };
  },

  addCommands() {
    return {
      insertLocalImage:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
