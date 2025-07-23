import { Node, NodeViewRenderer } from '@tiptap/core';

export const OGLinkExtension = Node.create({
  name: 'ogLinkWrapper',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      url: { default: '' },
      title: { default: '' },
      description: { default: '' },
      image: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-og-link-outer]',
        getAttrs: (node) => {
          if (!(node instanceof HTMLElement)) return false;

          const anchor = node.querySelector('a');
          const titleEl = node.querySelector('span[data-og-title]');
          const descEl = node.querySelector('span[data-og-description]');
          const imageDiv = anchor?.querySelector('div');
          const imageUrl = imageDiv?.getAttribute('data-og-image') || '';

          return {
            url: anchor?.getAttribute('href') || '',
            title: titleEl?.textContent || '',
            description: descEl?.textContent || '',
            image: imageUrl,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { url, title, description, image } = HTMLAttributes;

    return [
      'div',
      { 'data-og-link-outer': '', class: 'og-link-outer-wrapper' },
      [
        'div',
        { 'data-og-link-inner': '', class: 'og-link-inner-wrapper' },
        [
          'a',
          {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'og-container',
          },
          [
            'div',
            {
              class: 'og-thumbnail',
              style: `background-image: url('${image}');`,
            },
          ],
          [
            'div',
            { class: 'og-content' },
            [
              'span',
              {
                'data-og-title': '',
                class: 'og-title',
              },
              title,
            ],
            [
              'span',
              {
                'data-og-description': '',
                class: 'og-description',
              },
              description,
            ],
            [
              'span',
              {
                'data-og-url': '',
                class: 'og-url',
              },
              url,
            ],
          ],
        ],
      ],
    ];
  },

  addNodeView(): NodeViewRenderer {
    return ({ node }) => {
      const { url, title, description, image } = node.attrs;

      const outerWrapper = document.createElement('div');
      outerWrapper.setAttribute('data-og-link-outer', '');
      outerWrapper.className = 'og-link-outer-wrapper';

      const innerWrapper = document.createElement('div');
      innerWrapper.setAttribute('data-og-link-inner', '');
      innerWrapper.className = 'og-link-inner-wrapper';

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.className = 'og-container';

      const thumbnail = document.createElement('div');
      thumbnail.className = 'og-thumbnail';
      Object.assign(thumbnail.style, {
        backgroundImage: `url('${image}')`,
      });

      const contentEl = document.createElement('div');
      contentEl.className = 'og-content';

      const titleEl = document.createElement('span');
      titleEl.setAttribute('data-og-title', '');
      titleEl.className = 'og-title';
      titleEl.textContent = title;

      const descEl = document.createElement('span');
      descEl.setAttribute('data-og-description', '');
      descEl.className = 'og-description';
      descEl.textContent = description;

      const urlEl = document.createElement('span');
      urlEl.setAttribute('data-og-url', '');
      urlEl.className = 'og-url';
      urlEl.textContent = url;

      contentEl.append(titleEl, descEl, urlEl);
      anchor.append(thumbnail, contentEl);
      innerWrapper.appendChild(anchor);
      outerWrapper.appendChild(innerWrapper);

      return {
        dom: outerWrapper,
        contentDOM: null,
      };
    };
  },
});
