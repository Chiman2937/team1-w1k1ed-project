import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { postProfilePingAPI } from '@/api/profile/postProfilePingAPI';
import { useWikiContext } from '@/context/WikiContext';
import { useEffect, useState } from 'react';

interface Props {
  wikiData: GetProfileItemResponse;
  onSubmitSuccess: () => void;
}

const QuestionModal = ({ wikiData, onSubmitSuccess }: Props) => {
  const { setWikiProfile, isEditing, setEditingInfo, setIsEditing } = useWikiContext();
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleModalSubmit = async () => {
    setIsError(false);
    try {
      const res = await postProfilePingAPI({
        code: wikiData.code,
        securityAnswer: inputValue,
      });
      setEditingInfo(res);
      setIsEditing(true);
      onSubmitSuccess();
    } catch {
      setIsError(true);
    }
  };

  // 전역 state에 등록
  useEffect(() => {
    if (!isEditing) return;
    const {
      securityQuestion,
      nationality,
      family,
      bloodType,
      nickname,
      birthday,
      sns,
      job,
      mbti,
      city,
      image,
      content,
    } = wikiData;
    setWikiProfile({
      securityAnswer: inputValue,
      securityQuestion,
      nationality,
      family,
      bloodType,
      nickname,
      birthday,
      sns,
      job,
      mbti,
      city,
      image,
      content,
    });
  }, [isEditing]);

  return (
    <>
      <div>다음 퀴즈를 맞추고 위키를 작성해보세요</div>
      <div>
        <p>{wikiData.securityQuestion}</p>
        <input
          placeholder='답안을 입력해 주세요'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {isError && <span>정답이 아닙니다. 다시 시도해주세요</span>}
      </div>
      <button onClick={handleModalSubmit}>확인</button>
    </>
  );
};

export default QuestionModal;
