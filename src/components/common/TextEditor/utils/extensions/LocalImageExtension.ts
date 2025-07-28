import { Node, mergeAttributes } from '@tiptap/core';

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
          const img = (node as HTMLElement).querySelector('img');
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
    return ({ node, getPos, editor }) => {
      const outer = document.createElement('div');
      outer.className = 'image-outer-wrapper';
      outer.setAttribute('data-image-outer', '');
      outer.contentEditable = 'false';

      const inner = document.createElement('div');
      inner.className = 'image-inner-wrapper';
      inner.setAttribute('data-image-inner', '');

      const img = document.createElement('img');
      img.setAttribute('src', node.attrs.src);
      if (node.attrs.alt) img.setAttribute('alt', node.attrs.alt);
      if (node.attrs.width) img.style.width = `${node.attrs.width}px`;
      if (node.attrs.height) img.style.height = `${node.attrs.height}px`;

      const resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle';
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.right = '0';
      resizeHandle.style.bottom = '0';
      resizeHandle.style.width = '12px';
      resizeHandle.style.height = '12px';
      resizeHandle.style.background = 'rgba(0, 0, 0, 0.4)';
      resizeHandle.style.cursor = 'nwse-resize';

      inner.style.position = 'relative';
      inner.appendChild(img);
      inner.appendChild(resizeHandle);
      outer.appendChild(inner);

      // Resize 이벤트 로직
      let startX = 0;
      let startY = 0;
      let startWidth = 0;
      let startHeight = 0;

      const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        startX = event.clientX;
        startY = event.clientY;
        startWidth = img.offsetWidth;
        startHeight = img.offsetHeight;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseMove = (event: MouseEvent) => {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        const newWidth = Math.max(50, startWidth + dx);
        const newHeight = Math.max(50, startHeight + dy);

        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const newWidth = img.offsetWidth;
        const newHeight = img.offsetHeight;

        // 실제 Node 속성 업데이트
        const pos = getPos?.();
        if (typeof pos === 'number') {
          editor.commands.command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: newWidth,
              height: newHeight,
            });
            return true;
          });
        }
      };

      resizeHandle.addEventListener('mousedown', handleMouseDown);

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
