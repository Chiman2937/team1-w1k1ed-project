'use client';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { getProfilePingAPI } from '@/api/profile/getProfilePingAPI';
import { useWikiContext } from '@/context/WikiContext';
import { useCallback, useEffect } from 'react';
import ProfileTitle from './ProfileTitle/ProfileTitle';
import ProfileCard from './ProfileCard/ProfileCard';
import ProfileContent from './ProfileContent.tsx/ProfileContent';
import { useTextEditor } from '@/components/common/TextEditor/utils/hooks/useTextEditor';
import { handlehtmlParse } from '@/components/common/TextEditor/utils/handlers/handleHtmlParse';
import { patchProfileItemAPI } from '@/api/profile/patchProfileAPI';
import Timer from './Timer/Timer';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  wikiData: GetProfileItemResponse;
}

const WikiDetailSection = ({ wikiData }: Props) => {
  const { wikiProfile, setWikiProfile, setIsEditing, editingInfo, isEditing, setEditingInfo } =
    useWikiContext();

  const { user } = useAuthContext();

  //textEditor 인스턴스 객체 호출
  const { editor, tempFiles, setTempFiles } = useTextEditor({
    initialContent: wikiData.content,
  });

  const onTimerFinish = useCallback(() => {
    setEditingInfo(null);
    if (!isEditing) return;
    alert('시간 만료');
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
    window.location.reload();
  };

  // Timer 컴포넌트가 보이는 조건
  const timerVisibleCondition =
    //내가 수정중일 경우
    isEditing === true ||
    //뷰어 상태에서 누군가 수정중인데 그 사람이 내가 아닌 경우
    (!isEditing && !!editingInfo && editingInfo?.userId !== user?.id);

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
    <section>
      {timerVisibleCondition && (
        <Timer registeredAt={editingInfo?.registeredAt} onTimerFinish={onTimerFinish} />
      )}
      <ProfileTitle
        handleCancelClick={handleCancelClick}
        handleUpdateProfileSubmit={handleUpdateProfileSubmit}
        wikiData={wikiData}
      />
      <ProfileCard wikiData={wikiData} />
      <ProfileContent editor={editor} setTempFiles={setTempFiles} wikiData={wikiData} />
    </section>
  );
};

export default WikiDetailSection;
