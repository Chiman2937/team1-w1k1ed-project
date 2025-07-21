'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ComboBox, ComboContainer, ComboButton, ComboList, ComboListItem } from 'cy-combobox';
import { IoMdArrowDropdown as IconDropdown } from 'react-icons/io';
import clsx from 'clsx';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

import EditorButton from './EditorButton';
import Separator from './Separator';
import Link from '@tiptap/extension-link';
import {
  buttonActiveStyle,
  buttonDefaultStyle,
  comboBoxButtonDefaultStyle,
  comboBoxContainerDefaultStyle,
  comboBoxListDefaultStyle,
  comboBoxListItemDefaultStyle,
  comboBoxListItemSelectedStyle,
  toolbarStyle,
} from './TextEditorStyle';
import { LocalVideo } from './LocalVideo';
import { YoutubeVideo } from './YoutubeVideo';

const TextEditor = () => {
  const [_videos, setVideos] = useState<Record<string, File>>({});
  const [_images, setImages] = useState<Record<string, File>>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  //------------------------------Text Editor 인스턴스 객체 선언--------------------------------

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        allowBase64: true,
      }),
      LocalVideo,
      YoutubeVideo,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'text-editor',
      },
    },
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

  // ----------------------------------링크 등록 이벤트-------------------------------------

  const handleLinkSelect = useCallback(() => {
    if (!editor) return;

    // 링크가 이미 적용된 상태라면 해제
    if (editor.isActive('link')) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('에러 발생');
      }
    }
  }, [editor]);

  // ----------------------------------이미지 등록 이벤트-------------------------------------

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      const imageBlobURL = URL.createObjectURL(file);
      setImages((prev) => ({
        ...prev,
        [imageBlobURL]: file,
      }));

      editor
        .chain()
        .focus()
        .setImage({
          src: imageBlobURL,
          alt: file.name,
          title: file.name,
        })
        .run();
    },
    [editor],
  );

  const addImage = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  // ----------------------------------비디오 등록 이벤트-------------------------------------

  const handleVideoSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      const videoBlobURL = URL.createObjectURL(file);

      setVideos((prev) => ({
        ...prev,
        [videoBlobURL]: file,
      }));

      editor
        .chain()
        .focus()
        .insertLocalVideo({
          src: videoBlobURL,
          width: '640',
          height: '360',
        })
        .run();
    },
    [editor],
  );

  const addVideo = useCallback(() => {
    videoInputRef.current?.click();
  }, []);
  // ----------------------------------유튜브 등록 이벤트-------------------------------------

  const convertYoutubeURLToEmbed = (src: string): string => {
    const url = new URL(src);
    if (url.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (url.hostname.includes('youtube.com') && url.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
    }
    return src; // fallback
  };

  const addYoutubeVideo = useCallback(() => {
    const url = prompt('Enter YouTube URL');

    if (!editor) return;

    if (url) {
      editor
        .chain()
        .focus()
        .insertYoutubeEmbed({
          src: convertYoutubeURLToEmbed(url),
          width: '640',
          height: '360',
        })
        .run();
    }

    // if (url) {
    //   editor.commands.setYoutubeVideo({
    //     src: url,
    //     width: 640,
    //     height: 360,
    //   });
    // }
  }, [editor]);

  // -------------------------------------------------------------------------------------------

  if (!editor) return null;

  return (
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
          onClick={handleLinkSelect}
          className={clsx(buttonDefaultStyle, editor.isActive('link') && buttonActiveStyle)}
        />
        {/* 이미지 버튼 */}
        <EditorButton variant='image' onClick={addImage} className={clsx(buttonDefaultStyle)}>
          <input
            ref={imageInputRef}
            type='file'
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </EditorButton>
        {/* 로컬 비디오 버튼 */}
        <EditorButton variant='video' onClick={addVideo} className={clsx(buttonDefaultStyle)}>
          <input
            ref={videoInputRef}
            type='file'
            onChange={handleVideoSelect}
            style={{ display: 'none' }}
          />
        </EditorButton>
        {/* 유튜브 버튼 */}
        <EditorButton
          variant='youtube'
          onClick={addYoutubeVideo}
          className={clsx(buttonDefaultStyle)}
        />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
