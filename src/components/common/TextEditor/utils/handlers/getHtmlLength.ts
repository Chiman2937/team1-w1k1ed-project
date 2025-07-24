import type { Editor, JSONContent } from '@tiptap/react';

const MEDIA_TYPES = ['localImage', 'localVideo', 'ogLinkWrapper', 'youtubeEmbed'];

export const getHtmlLength = {
  withSpaces: (editor: Editor): number => {
    return getLength(editor, { ignoreSpaces: false });
  },

  withoutSpaces: (editor: Editor): number => {
    return getLength(editor, { ignoreSpaces: true });
  },
};

function getLength(editor: Editor, options: { ignoreSpaces: boolean }): number {
  const json: JSONContent = editor.getJSON();
  let length = 0;

  const traverse = (node: JSONContent) => {
    if (node.type === 'text' && typeof node.text === 'string') {
      const text = options.ignoreSpaces ? node.text.replace(/\s/g, '') : node.text;
      length += text.length;
    } else if (node.type && MEDIA_TYPES.includes(node.type)) {
      length += 1;
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  traverse(json);
  return length;
}
