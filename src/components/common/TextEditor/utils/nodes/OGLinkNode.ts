import { truncateText } from '@/utils/truncateText';
import { Node } from '@tiptap/core';

export const OGLinkNode = Node.create({
  name: 'ogLink',
  group: 'block',
  atom: true,
  selectable: true,

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
        tag: 'a[data-og-link]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { url, title, description, image } = HTMLAttributes;

    return [
      'a',
      {
        href: url,
        'data-og-link': '',
        class: 'group',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      [
        'div',
        {
          class:
            'border-1 border-grayscale-300 w-[450px] flex flex-row items-center shadow-sm bg-white group-hover:bg-grayscale-100',
        },
        [
          'div',
          {
            style: `width: 120px; height: 120px; background-image: url('${image}'); background-size: cover; background-position: center; background-repeat: no-repeat; flex-shrink: 0;`,
          },
        ],
        [
          'div',
          { class: 'px-[25px]' },
          [
            'span',
            { class: 'block text-xl-semibold text-grayscale-600 h-[36px] pb-1' },
            truncateText(title, 25),
          ],
          [
            'span',
            { class: 'block text-sm-medium text-gray-400 h-[30px] pb-2' },
            truncateText(description, 30),
          ],
          ['span', { class: 'block text-sm-medium text-green-500' }, truncateText(url, 40)],
        ],
      ],
    ];
  },
});
