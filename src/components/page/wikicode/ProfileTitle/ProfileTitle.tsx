import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import CopyToClipboard from '@/components/common/CopyToClipboard';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Modal } from 'react-simplified-package';
import QuestionModal from './components/QuestionModal';
import Button from '@/components/common/Button';
import { useWikiContext } from '@/context/WikiContext';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  wikiData: GetProfileItemResponse;
  handleCancelClick: () => void;
  handleUpdateProfileSubmit: () => void;
}

const ProfileTitle = ({ wikiData, handleCancelClick, handleUpdateProfileSubmit }: Props) => {
  const { isEditing, editingInfo } = useWikiContext();
  const { user } = useAuthContext();
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  // 위키 참여하기 가능한 조건
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    if (!editingInfo) {
      setCanEdit(true);
      return;
    }
    setCanEdit(
      // 수정중인 사람이 나 자신이거나
      editingInfo?.userId === user?.id ||
        // 내가 수정중이 아니며 수정중인 사람이 나일 경우
        (!isEditing && editingInfo?.userId === user?.id),
    );
  }, [isEditing, editingInfo?.userId, user?.id, editingInfo]);

  return (
    <div className='flex flex-col mb-[24px] gap-[24px] md:gap-[32px]'>
      <div className='flex flex-row justify-between items-center'>
        <h1
          className='text-grayscale-500
          text-3xl-semibold
          md:text-5xl-semibold'
        >
          {wikiData.name}
        </h1>
        {isEditing && (
          <div className='flex flex-row gap-[10px]'>
            <Button variant='secondary' className='py-[8px] px-[20px]' onClick={handleCancelClick}>
              취소
            </Button>
            <Button
              variant='primary'
              className='py-[8px] px-[20px]'
              onClick={handleUpdateProfileSubmit}
            >
              저장
            </Button>
          </div>
        )}
        {!isEditing && (
          <Button
            variant='primary'
            className={clsx('py-[9.5px] px-[22px]', 'md:py-[10.5px] md:px-[42px]')}
            onClick={() => setIsQuizModalOpen(true)}
            disabled={!canEdit}
          >
            {canEdit ? '위키 참여하기' : '편집중...'}
          </Button>
        )}
        <Modal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)}>
          <QuestionModal wikiData={wikiData} onSubmitSuccess={() => setIsQuizModalOpen(false)} />
        </Modal>
      </div>
      <div>
        <CopyToClipboard text={wikiData.code} />
      </div>
    </div>
  );
};

export default ProfileTitle;
