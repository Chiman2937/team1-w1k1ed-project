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
import ProfileNoContent from './ProfileNoContent/ProfileNoContent';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/common/LoadingOverlay';

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

  const [isUpload, setIsUploading] = useState(false);

  const { disable } = useUnloadAlert({ activeBy: isEditing });

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
    setIsUploading(true);
    let nextProfileImage = wikiProfile.image;
    if (!!tempProfileImageFile) {
      try {
        nextProfileImage = await uploadFileAPI({ fileObject: tempProfileImageFile, type: 'image' });
      } catch {
        router.push('/error');
      }
    }
    let nextContent;
    try {
      nextContent = await handlehtmlParse({ editor, files: tempFiles });
      const nextWikiProfile = {
        ...wikiProfile,
        content: nextContent,
        image: nextProfileImage,
      };
      await patchProfileItemAPI({ code: wikiData.code, params: nextWikiProfile });
      disable();
      window.location.reload();
    } catch {
      router.push('/error');
    }
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
    <section className='flex flex-row justify-center items-start gap-[20px] mx-auto'>
      <ProfileIndex
        className='hidden xl:block sticky top-[100px]'
        indexList={getHtmlHeadings(wikiData.content)}
      />
      <div
        className={clsx(
          'bg-white',
          'lg:rounded-[10px] lg:shadow-card',
          'p-[20px]',
          'w-full',
          'lg:max-w-[800px]',
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
            'md:flex-row',
            'lg:border-b-0',
            isEditing && 'lg:border-t-0 lg:py-0',
            'xl:py-0 xl:border-0',
          )}
        >
          <ProfileIndex className='xl:hidden' indexList={getHtmlHeadings(wikiData.content)} />
          <ProfileCard className='lg:hidden' wikiData={wikiData} />
        </div>
        <ProfileContent editor={editor} setTempFiles={setTempFiles} wikiData={wikiData} />
        <ProfileNoContent wikiData={wikiData} content={wikiData.content} />
        <Modal isOpen={isExpiredModalOpen} onClose={() => setIsExpiredtModalOpen(false)}>
          <ExpiredModal onClose={() => setIsExpiredtModalOpen(false)} />
        </Modal>
      </div>
      <ProfileCard className='hidden lg:block sticky top-[100px]' wikiData={wikiData} />
      {isUpload && <LoadingOverlay>게시글을 업로드하고 있어요.</LoadingOverlay>}
    </section>
  );
};

export default WikiDetailSection;
