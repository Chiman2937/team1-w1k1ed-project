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

const ImageAlignToolbar = ({ editor }: Props) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [imageAlignType, setImageAlignType] = useState<ImageAlignType | null>(null);

  useEffect(() => {
    if (!editor) return;

    const updateAlign = () => {
      if (editor.isActive('localImage', { align: 'left' })) return setImageAlignType('left');
      if (editor.isActive('localImage', { align: 'center' })) return setImageAlignType('center');
      if (editor.isActive('localImage', { align: 'right' })) return setImageAlignType('right');
      setImageAlignType(null);
    };

    const updatePosition = () => {
      const { state, view } = editor;
      const { selection } = state;

      if (selection instanceof NodeSelection && selection.node.type.name === 'localImage') {
        const dom = view.nodeDOM(selection.from) as HTMLElement;
        const imageWrapper = dom.closest('[data-image-outer]') as HTMLElement;
        imageWrapperRef.current = imageWrapper;

        if (dom) {
          const rect = dom.getBoundingClientRect();

          setCoords({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX + rect.width / 2,
          });
        }
      } else {
        setCoords(null);
      }
    };

    updateAlign();
    updatePosition();

    editor.on('selectionUpdate', updatePosition);
    editor.on('transaction', updateAlign);

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('transaction', updateAlign);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [editor]);

  // ResizeObserver로 이미지 사이즈가 바뀌는 경우 대응
  useEffect(() => {
    const imageWrapper = imageWrapperRef.current;
    if (!imageWrapper) return;

    const observer = new ResizeObserver(() => {
      const { state } = editor;
      const { selection } = state;
      if (selection instanceof NodeSelection && selection.node.type.name === 'localImage') {
        const dom = editor.view.nodeDOM(selection.from) as HTMLElement;
        if (dom) {
          const rect = dom.getBoundingClientRect();
          setCoords({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX + rect.width / 2,
          });
        }
      }
    });

    observer.observe(imageWrapper);

    return () => {
      observer.disconnect();
    };
  }, [coords?.top, coords?.left]); // 혹은 imageWrapperRef만으로도 가능

  if (!coords) return null;

  return createPortal(
    <div
      ref={toolbarRef}
      className={twMerge(clsx(toolbarStyle, 'absolute z-10 px-3 py-1 pointer-events-auto'))}
      style={{
        top: coords.top,
        left: coords.left,
        transform: 'translate(-50%, -100%)', // 중앙 위쪽
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

export default ImageAlignToolbar;
