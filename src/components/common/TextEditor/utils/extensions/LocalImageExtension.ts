import { CommandProps, mergeAttributes, Node } from '@tiptap/core';
import { NodeSelection } from '@tiptap/pm/state';

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
        aspectRatio: string;
        align: string;
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
      aspectRatio: {
        default: null,
        parseHTML: (element) => element.querySelector('img')?.style.aspectRatio || null,
        renderHTML: (attrs) =>
          attrs.aspectRatio ? { style: `aspect-ratio: ${attrs.aspectRatio}` } : {},
      },
      align: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-align') || 'center',
      },
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
            aspectRatio: img?.style.aspectRatio || null,
            align: el.getAttribute('data-align') ?? 'center',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { width, aspectRatio, src, alt } = HTMLAttributes;
    const align = HTMLAttributes.align ?? 'center';

    return [
      'div',
      {
        'data-image-outer': '',
        'data-align': align,
        class: 'image-outer-wrapper',
        style: `display: flex; justify-content: ${align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};`,
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
    return ({ node, getPos, editor }) => {
      const outer = document.createElement('div');
      outer.className = 'image-outer-wrapper';
      outer.setAttribute('data-image-outer', '');
      outer.setAttribute('data-align', node.attrs.align ?? 'center');

      outer.style.display = 'flex';
      outer.style.justifyContent =
        node.attrs.align === 'left'
          ? 'flex-start'
          : node.attrs.align === 'right'
            ? 'flex-end'
            : 'center';

      outer.contentEditable = 'false';

      const inner = document.createElement('div');
      inner.className = 'image-inner-wrapper';
      inner.setAttribute('data-image-inner', '');
      inner.style.position = 'relative';

      const img = document.createElement('img');
      img.setAttribute('src', node.attrs.src);
      if (node.attrs.alt) img.setAttribute('alt', node.attrs.alt);
      const { width, aspectRatio } = node.attrs;

      if (width) {
        img.setAttribute('width', String(width));
      }

      if (aspectRatio) {
        img.style.aspectRatio = aspectRatio;
      }

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
      let startWidth = 0;

      const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        startX = event.clientX;
        startWidth = img.offsetWidth;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseMove = (event: MouseEvent) => {
        const dx = event.clientX - startX;
        const newWidth = Math.max(50, startWidth + dx);

        img.style.width = `${newWidth}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const newWidth = img.offsetWidth;

        const pos = getPos?.();
        if (typeof pos === 'number') {
          editor.commands.command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: newWidth,
              aspectRatio: node.attrs.aspectRatio,
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
      setImageAlign:
        (align: 'left' | 'center' | 'right') =>
        ({ tr, state, dispatch }: CommandProps) => {
          const { selection } = state;
          const node = selection instanceof NodeSelection ? selection.node : null;
          console.log(node?.type.name);
          if (node?.type.name !== 'localImage') return false;

          const pos = selection.from;
          if (typeof pos === 'number') {
            const newAttrs = {
              ...node.attrs,
              align,
            };
            tr.setNodeMarkup(pos, undefined, newAttrs);
            dispatch?.(tr);
            return true;
          }

          return false;
        },
    };
  },
});
