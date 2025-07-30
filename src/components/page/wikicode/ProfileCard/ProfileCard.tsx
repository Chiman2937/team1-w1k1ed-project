import clsx from 'clsx';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { useWikiContext } from '@/context/WikiContext';
import ProfileItemListViewer from './components/ProfileItemListViewer';
import ProfileItemListEditor from './components/ProfileItemListEditor';
import { useAuthContext } from '@/context/AuthContext';
import ProfileImageViewer from './components/ProfileImageViewer';
import ProfileImageEditor from './components/ProfileImageEditor';

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
        'rounded-[10px]  shadow-card',
        // 'border-1 border-gray-300',
        'flex flex-col gap-[10px]',
        'w-full',
        'xs:flex-row xs:items-start',
        'lg:border-none',
        'lg:fixed lg:right-[20px] lg:top-[108px] lg:w-[250px]',
        'lg:flex-col lg:items-center',
      )}
    >
      <div
        className={clsx(
          // 'lg:bg-white lg:border-1 lg:border-gray-300',
          'relative flex flex-col gap-[5px]',
          'pt-[40px] px-[40px]',
          'w-full',
          'xs:w-[200px]',
          'sm:w-[250px]',
          'md:w-[250px]',
          'lg:w-full',
        )}
      >
        {editCondition && <ProfileImageEditor imageUrl={wikiData.image} />}
        {!editCondition && <ProfileImageViewer imageUrl={wikiData.image} />}
      </div>
      <div
        className={clsx(
          // 'lg:bg-white lg:border-1 lg:border-gray-300',

          'lg:w-full py-[20px] grow',
          'px-[20px]',
          'xs:pl-0',
          'lg:px-[20px]',
          'min-w-[200px]',
          'md:min-w-[250px]',
        )}
      >
        {editCondition && <ProfileItemListEditor />}
        {!editCondition && <ProfileItemListViewer wikiData={wikiData} />}
      </div>
    </article>
  );
};
export default ProfileCard;
