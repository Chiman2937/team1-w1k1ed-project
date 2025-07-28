import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import { postProfilePingAPI } from '@/api/profile/postProfilePingAPI';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useWikiContext } from '@/context/WikiContext';
import { useForm } from 'react-hook-form';
import { FaLock as IconLock } from 'react-icons/fa';

type FormValues = {
  securityAnswer: string;
};

interface Props {
  wikiData: GetProfileItemResponse;
  onClose: () => void;
}

const QuestionModal = ({ wikiData, onClose }: Props) => {
  const { setWikiProfile, setEditingInfo, setIsEditing } = useWikiContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields },
  } = useForm<FormValues>();

  const handleModalSubmit = async (data: FormValues) => {
    try {
      const res = await postProfilePingAPI({
        code: wikiData.code,
        securityAnswer: data.securityAnswer,
      });
      setEditingInfo(res);
      setIsEditing(true);

      // 전역 state에 등록
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
        securityAnswer: data.securityAnswer,
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

      onClose();
    } catch {
      setError('securityAnswer', {
        type: 'manual',
        message: '정답이 아닙니다. 다시 시도해주세요',
      });
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <IconLock className='text-grayscale-400 mt-[51px] mb-[21px] w-[20px] h-[20px]' />
      <h2 className='text-md-regular text-grayscale-400 text-center mb-[36px]'>
        다음 퀴즈를 맞추고
        <br />
        위키를 작성해보세요
      </h2>

      <form onSubmit={handleSubmit(handleModalSubmit)}>
        <label
          htmlFor='securityAnswer'
          className='inline-block text-2lg-semibold text-grayscale-500 mb-[10px]'
        >
          {wikiData.securityQuestion}
        </label>
        <Input
          name='securityAnswer'
          placeholder='답안을 입력해 주세요'
          className='w-[295px]'
          register={register('securityAnswer')}
          errors={errors}
          touchedFields={touchedFields}
        />
        <Button
          type='submit'
          variant='primary'
          className='flex justify-center items-center w-full mt-[36px]'
        >
          확인
        </Button>
      </form>

      <p className='text-xs-regular text-grayscale-400 mt-[20px]'>
        위키드는 지인들과 함께하는 즐거운 공간입니다.
        <br /> 지인에게 상처를 주지 않도록 작성해주세요
      </p>
    </div>
  );
};

export default QuestionModal;
