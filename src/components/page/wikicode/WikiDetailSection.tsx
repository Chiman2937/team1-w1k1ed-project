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
import { useRouter } from 'next/navigation';
import { useUnloadAlert } from '@/hooks/useUnloadAlert';
import ProfileQnAEditor from './ProfileQnAEditor/ProfileQnAEditor';

interface Props {
  wikiData: GetProfileItemResponse;
}

const WikiDetailSection = ({ wikiData }: Props) => {
  const { wikiProfile, setWikiProfile, setIsEditing, isEditing, setEditingInfo } = useWikiContext();

  //textEditor 인스턴스 객체 호출
  const { editor, tempFiles, setTempFiles } = useTextEditor({
    initialContent: wikiData.content,
  });

  const [isExpiredModalOpen, setIsExpiredtModalOpen] = useState(false);

  useUnloadAlert({ activeBy: isEditing });

  const router = useRouter();

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
    const nextContent = await handlehtmlParse({ editor, files: tempFiles });
    const nextWikiProfile = {
      ...wikiProfile,
      content: nextContent,
    };
    await patchProfileItemAPI({ code: wikiData.code, params: nextWikiProfile });
    setIsEditing(false);
    setWikiProfile(null);
    router.refresh();
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

  // 새로고침/닫기 시 브라우저 확인창 띄우기
  useEffect(() => {
    if (!isEditing) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // 브라우저 기본 메시지 표시
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditing]);

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
          'lg:py-0 lg:border-b-0',
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
