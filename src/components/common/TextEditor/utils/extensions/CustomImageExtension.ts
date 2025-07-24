import { Node, mergeAttributes } from '@tiptap/core';

export interface CustomImageOptions {
  HTMLAttributes: Record<string, HTMLImageElement>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      insertCustomImage: (attrs: { src: string; alt?: string }) => ReturnType;
    };
  }
}

export const CustomImageExtension = Node.create<CustomImageOptions>({
  name: 'customImage',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-image-outer]',
        getAttrs: (node) => {
          const img = (node as HTMLElement).querySelector('img');
          return {
            src: img?.getAttribute('src'),
            alt: img?.getAttribute('alt') ?? '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-image-outer': '',
        class: 'image-outer-wrapper',
      },
      [
        'div',
        {
          'data-image-inner': '',
          class: 'image-inner-wrapper',
        },
        ['img', mergeAttributes(HTMLAttributes)],
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const outer = document.createElement('div');
      outer.className = 'image-outer-wrapper';
      outer.setAttribute('data-image-outer', '');

      const inner = document.createElement('div');
      inner.className = 'image-inner-wrapper';
      inner.setAttribute('data-image-inner', '');

      const img = document.createElement('img');
      img.setAttribute('src', node.attrs.src);
      if (node.attrs.alt) img.setAttribute('alt', node.attrs.alt);

      inner.appendChild(img);
      outer.appendChild(inner);

      return {
        dom: outer,
      };
    };
  },

  addCommands() {
    return {
      insertCustomImage:
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
