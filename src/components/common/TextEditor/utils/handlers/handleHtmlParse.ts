'use client';
import { uploadFileAPI, UploadType } from '@/api/uploadFileAPI';
import { Editor, generateHTML, JSONContent } from '@tiptap/react';
import { replaceAspectRatioToHeight } from './replaceAspectRatioToHeight';
import { addIdToHeadings } from './addIdToHeadings';

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
  const aspectRatioconvertedHtml = replaceAspectRatioToHeight(html);
  const headingIdSetHtml = addIdToHeadings(aspectRatioconvertedHtml);

  return headingIdSetHtml;
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
