import { useEffect, useMemo, useReducer } from 'react';
import { Editor } from '@tiptap/react';

type BlockType = 'heading' | 'paragraph' | 'blockquote' | undefined;
type AlignType = 'left' | 'center' | 'right' | 'justify' | undefined;

type TextEditor = Editor | null;

export const useTextEditorForceUpdate = (editor: TextEditor) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const blockType: BlockType = useMemo(() => {
    if (editor?.isActive('heading', { level: 1 })) return 'heading';
    if (editor?.isActive('paragraph') && !editor?.isActive('blockquote')) return 'paragraph';
    if (editor?.isActive('blockquote')) return 'blockquote';
  }, [editor, editor?.state.selection]);

  const alignType: AlignType = useMemo(() => {
    if (editor?.isActive({ textAlign: 'left' })) return 'left';
    if (editor?.isActive({ textAlign: 'center' })) return 'center';
    if (editor?.isActive({ textAlign: 'right' })) return 'right';
    if (editor?.isActive({ textAlign: 'justify' })) return 'justify';
  }, [editor, editor?.state.selection]);

  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      forceUpdate();
    };

    editor.on('transaction', handler);
    return () => {
      editor.off('transaction', handler);
    };
  }, [editor]);

  return { blockType, alignType };
};
