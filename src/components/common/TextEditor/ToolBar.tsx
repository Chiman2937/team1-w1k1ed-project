'use client';
import './textarea/nodeHtmlStyle.css';
import './textarea/nodeOGStyle.css';
import './textarea/nodeLocalVideoStyle.css';
import './textarea/nodeYoutubeStyle.css';
import './textarea/nodeEditStyle.css';
import './textarea/nodeImageStyle.css';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useTextEditorForceUpdate } from '@/components/common/TextEditor/utils/hooks/useTextEditorForceUpdate';
import { Editor } from '@tiptap/react';
import { handleVideoSelect } from './utils/handlers/handleVideoSelect';
import { handleImageSelect } from './utils/handlers/handleImageSelect';
import {
  buttonActiveStyle,
  buttonDefaultStyle,
  comboBoxButtonDefaultStyle,
  comboBoxContainerDefaultStyle,
  comboBoxListDefaultStyle,
  comboBoxListItemDefaultStyle,
  comboBoxListItemSelectedStyle,
  toolbarSectionStyle,
  toolbarStyle,
} from './toolbar/toolBarStyle';
import EditorButton from './toolbar/components/EditorButton';
import Separator from './toolbar/components/Separator';
import { ComboBox, ComboContainer, ComboButton, ComboList, ComboListItem } from 'cy-combobox';
import { IoMdArrowDropdown as IconDropdown } from 'react-icons/io';
import { OgLinkData } from './toolbar/components/LinkModal/components/LinkPreview';
import LinkModal from './toolbar/components/LinkModal/LinkModal';

interface Props {
  editor: Editor;
  setTempFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>;
}

const ToolBar = ({ editor, setTempFiles }: Props) => {
  const [ogData, setOgData] = useState<OgLinkData | null>(null);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Editor에 작성된 요소들 style 감지를 위한 강제 업데이트
  const { blockType, alignType } = useTextEditorForceUpdate(editor);

  // 링크 등록 이벤트 연결

  const handleLinkButtonClick = useCallback(() => {
    setIsLinkModalOpen(true);
  }, []);

  const handleLinkSubmit = useCallback(() => {
    const extractYoutubeId = (url: string): string | null => {
      const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    const convertYoutubeUrlToEmbed = (url: string): string | null => {
      const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    setIsLinkModalOpen(false);
    const youtubeId = extractYoutubeId(ogData?.url || '');
    const youtubeEmbedUrl = convertYoutubeUrlToEmbed(ogData?.url || '');

    if (youtubeId) {
      if (!youtubeEmbedUrl) return;
      editor?.commands.insertYoutubeEmbed({
        src: youtubeEmbedUrl,
      });
    } else {
      editor?.commands.insertContent({
        type: 'ogLinkWrapper',
        attrs: {
          url: ogData?.url,
          title: ogData?.title,
          description: ogData?.description,
          image: ogData?.image,
        },
      });
    }

    setOgData(null);
  }, [editor, ogData]);

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
    <div id='tool-bar' className={toolbarStyle}>
      <div className={toolbarSectionStyle}>
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
        <Separator />
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
      </div>
      <div className={toolbarSectionStyle}>
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
        <Separator />
      </div>
      <div className={toolbarSectionStyle}>
        {/* 구분선 */}
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
        {/* 링크 버튼 */}
        <EditorButton
          variant='link'
          onClick={handleLinkButtonClick}
          className={clsx(buttonDefaultStyle)}
        />
        {isLinkModalOpen && (
          <LinkModal ogData={ogData} setOgData={setOgData} onModalClose={handleLinkSubmit} />
        )}
        {/* 이미지 버튼 */}
        <EditorButton variant='image' onClick={addImage} className={clsx(buttonDefaultStyle)}>
          <input
            ref={imageInputRef}
            type='file'
            onChange={(e) => handleImageSelect(e, editor, setTempFiles)}
            style={{ display: 'none' }}
          />
        </EditorButton>
        {/* 로컬 비디오 버튼 */}
        <EditorButton variant='video' onClick={addVideo} className={clsx(buttonDefaultStyle)}>
          <input
            ref={videoInputRef}
            type='file'
            onChange={(e) => handleVideoSelect(e, editor, setTempFiles)}
            style={{ display: 'none' }}
          />
        </EditorButton>
      </div>
    </div>
  );
};

export default ToolBar;
