import { Editor } from '@tiptap/react';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import ContentEditor from '@/components/common/TextEditor/ContentEditor';
import ContentViewer from '@/components/common/TextEditor/ContentViewer';
import ToolBar from '@/components/common/TextEditor/ToolBar';
import { useAuthContext } from '@/context/AuthContext';
import { useWikiContext } from '@/context/WikiContext';
import EditorClickCatcher from '@/components/common/TextEditor/textarea/EditorClickCatcher';
interface Props {
  editor: Editor;
  setTempFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>;
  wikiData: GetProfileItemResponse;
}

const ProfileContent = ({ editor, setTempFiles, wikiData }: Props) => {
  const { isEditing, editingInfo } = useWikiContext();
  const { user } = useAuthContext();

  // 글 수정 조건
  const editCondition =
    isEditing === true && // 1. 수정 모드 진입한 경우
    editingInfo?.userId === user?.id; // 2. 현재 수정 등록된 userId와 나의 userId가 동일 할 경우

  if (!editor) return;
  return (
    <div className='pt-[10px] relative'>
      {editCondition && (
        <div>
          <div className='sticky top-[110px] md:top-[130px]  z-1'>
            <ToolBar editor={editor} setTempFiles={setTempFiles} />
          </div>
          <div className='mt-[10px] flex flex-col min-h-[237px]'>
            <ContentEditor editor={editor} />
            <EditorClickCatcher editor={editor} />
          </div>
        </div>
      )}
      {!editCondition && <ContentViewer content={wikiData.content} />}
    </div>
  );
};

export default ProfileContent;
