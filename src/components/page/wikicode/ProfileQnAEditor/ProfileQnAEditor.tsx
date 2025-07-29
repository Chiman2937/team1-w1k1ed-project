import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { useWikiContext } from '@/context/WikiContext';
import { ChangeEvent } from 'react';
import ProfileField from '../ProfileCard/components/ProfileField';
import clsx from 'clsx';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  wikiData: GetProfileItemResponse;
}

const ProfileQnAEditor = ({ wikiData }: Props) => {
  const { wikiProfile, setWikiProfile, isEditing, editingInfo } = useWikiContext();
  const { user } = useAuthContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof GetProfileItemResponse;
    const value = e.target.value;
    setWikiProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  // 프로필 수정가능 조건
  const editCondition =
    isEditing === true && // 1. 수정 모드 진입한 경우
    editingInfo?.userId === user?.id && // 2. 현재 수정 등록된 userId와 나의 userId가 동일 할 경우
    user?.profile?.id === wikiData?.id; // 3. 나의 profileId와 wiki 페이지의 profileId가 동일한 경우

  if (!wikiProfile) return;
  if (!editCondition) return;
  return (
    <div className='py-[20px] border-t-1 border-gray-200'>
      <div className={clsx('flex flex-col gap-[20px] max-w-[400px]')}>
        <ProfileField>
          <ProfileField.label>위키 질문</ProfileField.label>
          <ProfileField.input
            id='securityQuestion'
            value={wikiProfile?.securityQuestion}
            onChange={handleInputChange}
          />
        </ProfileField>
        <ProfileField>
          <ProfileField.label>위키 답변</ProfileField.label>
          <ProfileField.input
            id='securityAnswer'
            value={wikiProfile?.securityAnswer}
            onChange={handleInputChange}
          />
        </ProfileField>
      </div>
    </div>
  );
};

export default ProfileQnAEditor;
