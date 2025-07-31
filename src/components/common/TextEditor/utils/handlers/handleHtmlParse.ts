import { uploadFileAPI, UploadType } from '@/api/uploadFileAPI';
import { Editor, generateHTML, JSONContent } from '@tiptap/react';

interface Props {
  editor: Editor;
  files: Record<string, File>;
}

export const handlehtmlParse = async ({ editor, files }: Props) => {
  const parsedHtml = await getParsedHtml({ editor, files });
  return parsedHtml;
};

const getParsedHtml = async ({ editor, files }: Props) => {
  const contentJson = await getSanitizedJson({ editor, files });
  const html = generateHTML(contentJson, editor.extensionManager.extensions);

  const convertedHtml = replaceAspectRatioToHeight(html);

  return convertedHtml;
};
const getSanitizedJson = async ({ editor, files }: Props) => {
  const contentJson = editor.getJSON();
  const replaceBlobs = async (node: JSONContent): Promise<void> => {
    if (node.attrs?.src?.startsWith('blob:')) {
      const uploadType = node.type;
      let file = null;
      const typeMap = {
        localImage: 'image',
        localVideo: 'video',
      };
      if (uploadType === 'localImage' || uploadType === 'localVideo') {
        const type = typeMap[uploadType] as UploadType;
        file = files[node.attrs.src];
        if (file) {
          try {
            const url = await uploadFileAPI({ fileObject: file, type });
            node.attrs.src = url;
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    if (node.content) {
      await Promise.all(node.content.map(replaceBlobs));
    }
  };
  await replaceBlobs(contentJson);
  return contentJson;
};

const replaceAspectRatioToHeight = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const imgs = doc.querySelectorAll('img');

  imgs.forEach((img) => {
    const style = img.getAttribute('style') ?? '';
    const widthStr = img.getAttribute('width');
    const width = widthStr ? parseInt(widthStr) : null;

    // aspect-ratio 파싱
    const match = style.match(/aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/);
    if (match && width) {
      const [, w, h] = match;
      const aspectRatio = parseFloat(w) / parseFloat(h);
      const height = Math.round(width / aspectRatio);

      // height 속성 삽입
      img.setAttribute('height', String(height));

      // style에서 aspect-ratio 제거
      const cleanedStyle = style.replace(/aspect-ratio:\s*\d+\s*\/\s*\d+;?/g, '').trim();
      if (cleanedStyle) {
        img.setAttribute('style', cleanedStyle);
      } else {
        img.removeAttribute('style');
      }
    }
  });

  return doc.body.innerHTML;
};
