import clsx from 'clsx';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { useWikiContext } from '@/context/WikiContext';
import Image from 'next/image';
import ProfileItemListViewer from './components/ProfileItemListViewer';
import ProfileItemListEditor from './components/ProfileItemListEditor';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  wikiData: GetProfileItemResponse;
}

const ProfileCard = ({ wikiData }: Props) => {
  const { isEditing, editingInfo } = useWikiContext();
  const { user } = useAuthContext();

  // 프로필 수정가능 조건
  const editCondition =
    isEditing === true && // 1. 수정 모드 진입한 경우
    editingInfo?.userId === user?.id && // 2. 현재 수정 등록된 userId와 나의 userId가 동일 할 경우
    user?.profile?.id === wikiData?.id; // 3. 나의 profileId와 wiki 페이지의 profileId가 동일한 경우

  return (
    <article
      className={clsx(
        'border-1 rounded-[10px] flex flex-row items-start',
        ' px-[20px] py-[15px]',
        'flex flex-row gap-[20px]',
      )}
    >
      <div className={clsx('relative rounded-full w-[62px] aspect-square overflow-hidden')}>
        <Image src={wikiData.image} alt='프로필 이미지' objectFit='cover' layout='fill' />
      </div>
      {editCondition && <ProfileItemListEditor />}
      {!editCondition && <ProfileItemListViewer wikiData={wikiData} />}
    </article>
  );
};
export default ProfileCard;
