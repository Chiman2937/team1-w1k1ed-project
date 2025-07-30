'use client';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { getProfilePingAPI } from '@/api/profile/getProfilePingAPI';
import { useWikiContext } from '@/context/WikiContext';
import { useCallback, useEffect, useState } from 'react';
import ProfileTitle from './ProfileTitle/ProfileTitle';
import ProfileCard from './ProfileCard/ProfileCard';
import ProfileContent from './ProfileContent.tsx/ProfileContent';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import { patchProfileItemAPI } from '@/api/profile/patchProfileAPI';
import { Modal } from 'react-simplified-package';
import ExpiredModal from './components/ExpiredModal';
import clsx from 'clsx';
import ProfileIndex from './ProfileIndex/ProfileIndex';
import { getHtmlHeadings } from '@/components/common/TextEditor/utils/handlers/getHtmlHeadings';
import WikiInfo from './WikiInfo/WikiInfo';
import { ToastRender } from 'cy-toast';
import { useUnloadAlert } from '@/hooks/useUnloadAlert';
import ProfileQnAEditor from './ProfileQnAEditor/ProfileQnAEditor';
import { uploadFileAPI } from '@/api/uploadFileAPI';

interface Props {
  wikiData: GetProfileItemResponse;
}

const WikiDetailSection = ({ wikiData }: Props) => {
  const {
    wikiProfile,
    setWikiProfile,
    setIsEditing,
    isEditing,
    setEditingInfo,
    tempProfileImageFile,
  } = useWikiContext();

  //textEditor 인스턴스 객체 호출
  const { editor, tempFiles, setTempFiles } = useTextEditor({
    initialContent: wikiData.content,
  });

  const [isExpiredModalOpen, setIsExpiredtModalOpen] = useState(false);

  const { disable } = useUnloadAlert({ activeBy: isEditing });

  const onTimerFinish = useCallback(() => {
    setEditingInfo(null);
    if (!isEditing) return;
    setIsExpiredtModalOpen(true);
    setIsEditing(false);
  }, [isEditing, setEditingInfo, setIsEditing]);

  // 수정 취소 이벤트
  const handleCancelClick = () => {
    setWikiProfile(null);
    setIsEditing(false);
  };

  // 수정 업로드 이벤트
  const handleUpdateProfileSubmit = async () => {
    if (!editor) return;
    if (!wikiProfile) return;
    let nextProfileImage = wikiProfile.image;
    if (!!tempProfileImageFile) {
      nextProfileImage = await uploadFileAPI({ fileObject: tempProfileImageFile, type: 'image' });
    }
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    const nextWikiProfile = {
      ...wikiProfile,
      content: nextContent,
      image: nextProfileImage,
    };
    await patchProfileItemAPI({ code: wikiData.code, params: nextWikiProfile });
    disable();
    window.location.reload();
  };

  // 수정 중 현황 정보 전역 state에 등록
  useEffect(() => {
    const getProfilePing = async () => {
      const { code } = wikiData;
      try {
        const res = await getProfilePingAPI({ code });
        setEditingInfo(res);
      } catch {
        setEditingInfo(null);
      }
    };
    getProfilePing();
  }, [setEditingInfo, wikiData]);

  if (!editor) return;

  return (
    <section
      className={clsx(
        'bg-white',
        'rounded-[10px]  shadow-card', //
        'p-[20px] mx-auto',
        // 'lg:border-1 lg:border-gray-300',
      )}
    >
      <ToastRender />
      <ProfileTitle
        handleCancelClick={handleCancelClick}
        handleUpdateProfileSubmit={handleUpdateProfileSubmit}
        wikiData={wikiData}
      />
      <WikiInfo onTimerFinish={onTimerFinish} />
      <ProfileQnAEditor wikiData={wikiData} />
      <div
        className={clsx(
          'border-y-1 border-gray-200',
          'flex flex-col-reverse items-start gap-[30px]',
          'w-full py-[20px]',
          'sm:flex-row',
          'xl:py-0 xl:border-0',
          'lg:border-b-0',
        )}
      >
        <ProfileIndex indexList={getHtmlHeadings(wikiData.content)} />
        <ProfileCard wikiData={wikiData} />
      </div>
      <ProfileContent editor={editor} setTempFiles={setTempFiles} wikiData={wikiData} />
      <Modal isOpen={isExpiredModalOpen} onClose={() => setIsExpiredtModalOpen(false)}>
        <ExpiredModal onClose={() => setIsExpiredtModalOpen(false)} />
      </Modal>
    </section>
  );
};

export default WikiDetailSection;
