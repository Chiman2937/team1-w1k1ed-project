'use client';
import './textarea/editorHtmlStyle.css';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { useTextEditorForceUpdate } from '@/components/common/TextEditor/utils/hooks/useTextEditorForceUpdate';
import { EditorContent } from '@tiptap/react';
import { handleLinkSelect } from './utils/handlers/handleLinkSelect';
import { handleVideoSelect } from './utils/handlers/handleVideoSelect';
import { handleImageSelect } from './utils/handlers/handleImageSelect';
import { handleYoutubeSelect } from './utils/handlers/handleYoutubeSelect';
import {
  buttonActiveStyle,
  buttonDefaultStyle,
  comboBoxButtonDefaultStyle,
  comboBoxContainerDefaultStyle,
  comboBoxListDefaultStyle,
  comboBoxListItemDefaultStyle,
  comboBoxListItemSelectedStyle,
  toolbarStyle,
} from './toolbar/toolBarStyle';
import EditorButton from './toolbar/components/EditorButton';
import Separator from './toolbar/components/Separator';
import { ComboBox, ComboContainer, ComboButton, ComboList, ComboListItem } from 'cy-combobox';
import { IoMdArrowDropdown as IconDropdown } from 'react-icons/io';

const TextEditor = () => {
  const [_videos, setVideos] = useState<Record<string, File>>({});
  const [_images, setImages] = useState<Record<string, File>>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Text Editor 인스턴스 객체 선언
  const editor = useTextEditor();

  // Editor에 작성된 요소들 style 감지를 위한 강제 업데이트
  const { blockType, alignType } = useTextEditorForceUpdate(editor);

  // 이미지 등록 이벤트 연결
  const addImage = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  // 비디오 등록 이벤트 연결
  const addVideo = useCallback(() => {
    videoInputRef.current?.click();
  }, []);

  if (!editor) return null;

  return (
    // Tool Bar 컴포넌트
    <div className='flex flex-col gap-5'>
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
        {/* 링크 버튼 */}
        <EditorButton
          variant='link'
          onClick={() => handleLinkSelect(editor)}
          className={clsx(buttonDefaultStyle, editor.isActive('link') && buttonActiveStyle)}
        />
        {/* 이미지 버튼 */}
        <EditorButton variant='image' onClick={addImage} className={clsx(buttonDefaultStyle)}>
          <input
            ref={imageInputRef}
            type='file'
            onChange={(e) => handleImageSelect(e, editor, setImages)}
            style={{ display: 'none' }}
          />
        </EditorButton>
        {/* 로컬 비디오 버튼 */}
        <EditorButton variant='video' onClick={addVideo} className={clsx(buttonDefaultStyle)}>
          <input
            ref={videoInputRef}
            type='file'
            onChange={(e) => handleVideoSelect(e, editor, setVideos)}
            style={{ display: 'none' }}
          />
        </EditorButton>
        {/* 유튜브 버튼 */}
        <EditorButton
          variant='youtube'
          onClick={() => handleYoutubeSelect(editor)}
          className={clsx(buttonDefaultStyle)}
        />
      </div>
      {/* Text Area 컴포넌트 */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
