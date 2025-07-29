import React, { useEffect, useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { createPortal } from 'react-dom';
import { NodeSelection } from 'prosemirror-state';
import EditorButton from '../toolbar/components/EditorButton';
import clsx from 'clsx';
import { buttonActiveStyle, buttonDefaultStyle, toolbarStyle } from '../toolbar/toolBarStyle';
import { twMerge } from 'tailwind-merge';

interface Props {
  editor: Editor;
}

type ImageAlignType = 'left' | 'center' | 'right' | 'justify' | undefined;

const ImageAlignToolBar = ({ editor }: Props) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [imageAlignType, setImageAlignType] = useState<ImageAlignType | null>(null);
  useEffect(() => {
    if (!editor) return;

    const updateAlign = () => {
      if (editor.isActive('localImage', { align: 'left' })) return setImageAlignType('left');
      if (editor.isActive('localImage', { align: 'center' })) return setImageAlignType('center');
      if (editor.isActive('localImage', { align: 'right' })) return setImageAlignType('right');
      setImageAlignType(null); // 선택 해제되면 초기화
    };

    const updatePosition = () => {
      const { state, view } = editor;
      const { selection } = state;

      // 이미지 노드인지 확인
      if (selection instanceof NodeSelection && selection.node.type.name === 'localImage') {
        const dom = view.nodeDOM(selection.from) as HTMLElement;
        const imageWrapper = dom.closest('[data-image-outer]') as HTMLElement;
        imageWrapperRef.current = imageWrapper;
        if (dom) {
          const rect = dom.getBoundingClientRect();

          setCoords({
            top: rect.top + window.scrollY - 10, // 혹은 원래대로 -36, 상황 맞게
            left: rect.left + window.scrollX + rect.width / 2,
          });
        }
      } else {
        setCoords(null);
      }
    };
    updateAlign(); // 초기 렌더 시 실행
    updatePosition();
    editor.on('selectionUpdate', updatePosition);
    editor.on('transaction', updateAlign);

    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('transaction', updateAlign);
    };
  }, [editor]);

  if (!coords) return null;

  return createPortal(
    <div
      ref={toolbarRef}
      className={twMerge(clsx(toolbarStyle, 'absolute z-10 px-3 py-1 pointer-events-auto'))}
      style={{
        top: coords.top,
        left: coords.left,
        transform: 'translateX(-50%)',
      }}
    >
      <EditorButton
        variant='left'
        onClick={() => editor?.chain().focus().setImageAlign('left').run()}
        className={clsx(buttonDefaultStyle, imageAlignType === 'left' && buttonActiveStyle)}
      />
      <EditorButton
        variant='center'
        onClick={() => editor?.chain().focus().setImageAlign('center').run()}
        className={clsx(buttonDefaultStyle, imageAlignType === 'center' && buttonActiveStyle)}
      />
      <EditorButton
        variant='right'
        onClick={() => editor?.chain().focus().setImageAlign('right').run()}
        className={clsx(buttonDefaultStyle, imageAlignType === 'right' && buttonActiveStyle)}
      />
    </div>,
    document.body,
  );
};

export default ImageAlignToolBar;
