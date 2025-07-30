import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { LocalVideoExtension } from '@/components/common/TextEditor/utils/extensions/LocalVideoExtension';
import { YoutubeExtension } from '@/components/common/TextEditor/utils/extensions/YoutubeExtension';
import { OGLinkExtension } from '../extensions/OGLinkExtension';
import { LocalImageExtension } from '../extensions/LocalImageExtension';
import { useState } from 'react';
import { getHtmlLength } from '../handlers/getHtmlLength';
import { removeHeadingIds } from '../handlers/removeHeadingIds';

interface Props {
  initialContent?: string;
}

export const useTextEditor = ({ initialContent = '' }: Props = {}) => {
  const [tempFiles, setTempFiles] = useState<Record<string, File>>({});
  const [lengthWithSpaces, setLengthWithSpaces] = useState<number>(0);
  const [lengthWithoutSpaces, setLengthWithoutSpaces] = useState<number>(0);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        allowBase64: true,
      }),
      LocalVideoExtension,
      YoutubeExtension,
      OGLinkExtension,
      YoutubeExtension,
      LocalImageExtension,
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
    onUpdate: ({ editor }) => {
      setLengthWithSpaces(getHtmlLength.withSpaces(editor));
      setLengthWithoutSpaces(getHtmlLength.withoutSpaces(editor));
      console.log('[DEBUG] editor updated');
    },
    content: removeHeadingIds(initialContent),
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  return {
    editor,
    tempFiles,
    setTempFiles,
    lengthWithSpaces,
    lengthWithoutSpaces,
  };
};
