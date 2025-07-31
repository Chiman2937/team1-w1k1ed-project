import Button from '@/components/common/Button';
import { getHtmlStringIsEmpty } from '@/components/common/TextEditor/utils/handlers/getHtmlStringIsEmpty';
import { useAuthContext } from '@/context/AuthContext';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-simplified-package';
import QuestionModal from '../ProfileTitle/components/QuestionModal';
import { useState } from 'react';
import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';

interface Props {
  wikiData: GetProfileItemResponse;
  content: string;
}

const ProfileNoContent = ({ wikiData, content }: Props) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();

  const isEmpty = getHtmlStringIsEmpty(content);
  const isLogin = user !== null;

  const handleLoginClick = () => {
    router.push('/login');
  };

  if (!isEmpty) return null;

  return (
    <div className={clsx('bg-gray-100 rounded-[15px] py-[40px]', 'flex flex-col items-center')}>
      {isLogin && (
        <div className='flex flex-col items-center gap-[10px]'>
          <p className='text-center text-grayscale-400 text-lg-regular'>
            아직 작성된 내용이 없네요.
            <br />
            위키에 참여해 친구의 정보를 작성해보세요!
          </p>
          <Button variant='primary' onClick={() => setIsQuizModalOpen(true)}>
            위키 참여하기
          </Button>
        </div>
      )}
      <Modal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)}>
        <QuestionModal wikiData={wikiData} onClose={() => setIsQuizModalOpen(false)} />
      </Modal>
      {!isLogin && (
        <div className='flex flex-col items-center gap-[10px]'>
          <p className='text-center text-grayscale-400 text-lg-regular'>
            아직 작성된 내용이 없네요.
            <br />
            로그인 후 위키에 참여해보세요!
          </p>
          <Button variant='primary' onClick={handleLoginClick}>
            로그인
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileNoContent;
