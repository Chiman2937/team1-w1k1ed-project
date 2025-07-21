'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { ComboBox, ComboContainer, ComboButton, ComboList, ComboListItem } from 'cy-combobox';
import { IoMdArrowDropdown as IconDropdown } from 'react-icons/io';
import clsx from 'clsx';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';

import EditorButton from './EditorButton';
import Separator from './Separator';

const TextEditor = () => {
  //------------------------------Text Editor 인스턴스 객체 선언--------------------------------

  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  //----------------Editor에 작성된 요소들 style 감지를 위한 강제 업데이트 구문--------------------

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const blockType = useMemo(() => {
    if (editor?.isActive('heading', { level: 1 })) return 'heading';
    if (editor?.isActive('paragraph') && !editor?.isActive('blockquote')) return 'paragraph';
    if (editor?.isActive('blockquote')) return 'blockquote';
  }, [editor, editor?.state.selection]);

  const alignType = useMemo(() => {
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

  //--------------------------Text Editor 각 구성요소의 스타일 정의------------------------------

  const toolbarStyle = clsx(
    'flex flex-row items-center gap-[10px]',
    'bg-grayscale-100 rounded-[10px] py-[10px] px-[30px]',
  );

  const buttonDefaultStyle = clsx(
    'p-[5px] rounded-[5px] cursor-pointer',
    'text-grayscale-400 hover:text-grayscale-500',
  );
  const buttonActiveStyle = 'bg-grayscale-200';

  const comboBoxContainerDefaultStyle = 'font-medium text-grayscale-400';

  const comboBoxButtonDefaultStyle = clsx(
    'h-[20px] w-[80px] bg-grayscale-100',
    'px-1',
    'flex flex-row justify-between items-center gap-[5px]',
    'cursor-pointer',
  );

  const comboBoxListDefaultStyle = clsx(
    'absolute',
    'flex flex-col',
    'w-[80px] bg-grayscale-50 border-1 border-grayscale-200 shadow-lg',
    'z-1',
  );

  const comboBoxListItemDefaultStyle = clsx('px-1 py-1', 'text-left cursor-pointer');
  const comboBoxListItemSelectedStyle = clsx('bg-grayscale-100 text-grayscale-500');

  // -------------------------------------------------------------------------------------------

  if (!editor) return null;

  return (
    <div id='text-editor'>
      <div id='tool-bar' className={toolbarStyle}>
        {/* 굵게 버튼 */}
        <EditorButton
          variant='bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(buttonDefaultStyle, editor.isActive('bold') && buttonActiveStyle)}
        />
        {/* 기울임 버튼 */}
        <EditorButton
          variant='italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(buttonDefaultStyle, editor.isActive('italic') && buttonActiveStyle)}
        />
        {/* 밑줄 버튼 */}
        <EditorButton
          variant='underline'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx(buttonDefaultStyle, editor.isActive('underline') && buttonActiveStyle)}
        />
        {/* 취소선 버튼 */}
        <EditorButton
          variant='strike'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx(buttonDefaultStyle, editor.isActive('strike') && buttonActiveStyle)}
        />
        {/* 구분선 */}
        <Separator />
        {/* 문단 서식 변경 콤보박스 */}
        <ComboBox>
          <ComboContainer className={comboBoxContainerDefaultStyle}>
            <ComboButton className={comboBoxButtonDefaultStyle} value={blockType}>
              <IconDropdown className='pointer-events-none' />
            </ComboButton>
            <ComboList className={comboBoxListDefaultStyle}>
              <ComboListItem
                className={clsx(
                  comboBoxListItemDefaultStyle,
                  blockType === 'heading' && comboBoxListItemSelectedStyle,
                )}
                value='heading'
                onClick={() =>
                  editor.chain().focus().unsetBlockquote().setNode('heading', { level: 1 }).run()
                }
              >
                제목
              </ComboListItem>
              <ComboListItem
                className={clsx(
                  comboBoxListItemDefaultStyle,
                  blockType === 'paragraph' && comboBoxListItemSelectedStyle,
                )}
                value='paragraph'
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                본문
              </ComboListItem>
              <ComboListItem
                className={clsx(
                  comboBoxListItemDefaultStyle,
                  blockType === 'blockquote' && comboBoxListItemSelectedStyle,
                )}
                value='blockquote'
                onClick={() => editor.chain().focus().setParagraph().toggleBlockquote().run()}
              >
                인용구
              </ComboListItem>
            </ComboList>
          </ComboContainer>
        </ComboBox>
        {/* 리스트 버튼 */}
        <EditorButton
          variant='bullet'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            buttonDefaultStyle,
            (editor?.isActive('bulletList') || editor?.isActive({ bulletList: true })) &&
              buttonActiveStyle,
          )}
        />
        {/* 숫자 리스트 버튼 */}
        <EditorButton
          variant='number'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(buttonDefaultStyle, editor.isActive('orderedList') && buttonActiveStyle)}
        />
        {/* 구분선 */}
        <Separator />
        {/* 왼쪽 정렬 버튼 */}
        <EditorButton
          variant='left'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={clsx(buttonDefaultStyle, alignType === 'left' && buttonActiveStyle)}
        />
        {/* 가운데 정렬 버튼 */}
        <EditorButton
          variant='center'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={clsx(buttonDefaultStyle, alignType === 'center' && buttonActiveStyle)}
        />
        {/* 오른쪽 정렬 버튼 */}
        <EditorButton
          variant='right'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={clsx(buttonDefaultStyle, alignType === 'right' && buttonActiveStyle)}
        />
        {/* 구분선 */}
        <Separator />
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx(editor.isActive('codeBlock') && activeButtonStyle)}
        >
          코드블럭
        </button> */}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
