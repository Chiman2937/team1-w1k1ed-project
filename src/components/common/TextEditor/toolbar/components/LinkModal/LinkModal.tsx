import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LinkPreview, { OgData, OgLinkData } from './components/LinkPreview';
import { truncateText } from '@/utils/truncateText';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

interface Props {
  onModalClose: () => void;
  ogData: OgLinkData | null;
  setOgData: Dispatch<SetStateAction<OgLinkData | null>>;
}

const LinkModal = ({ onModalClose, ogData, setOgData }: Props) => {
  const [isMount, setIsMount] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`/api/fetch-og?url=${inputValue}`);
    const data: OgData = await res.json();
    setIsLoading(false);
    setIsError(false);
    if (!res.ok) {
      setOgData(null);
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setOgData({
      title: truncateText(data.title, 30),
      description: truncateText(data.description, 30),
      image: data.image,
      url: inputValue,
    });
  };

  const handleLinkSubmit = () => {
    setOgData(ogData);
    onModalClose();
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return;

  return (
    <div className='z-1'>
      <div className='bg-grayscale-50 flex flex-col items-center w-fit'>
        <form className='flex flex-col items-center gap-4 pb-4' onSubmit={handleInputSubmit}>
          <label htmlFor='linkSearch' className='text-xl-bold text-grayscale-600'>
            링크
          </label>
          <div
            className='w-[450px] border-1 border-grayscale-300 py-1 px-2
          flex flex-row gap-2 items-center'
          >
            <input
              id='linkSearch'
              className='outline-none w-full text-md-regular placeholder:text-grayscale-300'
              placeholder='URL을 입력해주세요.'
              value={inputValue}
              onChange={handleInputChange}
            />
            {isLoading && <LoadingSpinner.lineCircle lineWeight={2} distanceFromCenter={6} />}
          </div>
        </form>

        {ogData && <LinkPreview ogLinkData={ogData} />}
        {isError && (
          <div>
            <span className='text-xs-regular text-grayscale-400'>
              링크 정보를 불러오는 데 실패했습니다. 링크를 다시 확인해주세요.
            </span>
          </div>
        )}

        <button
          className='text-md-semibold mt-4 border-1 border-grayscale-300 px-10 py-1 cursor-pointer hover:bg-grayscale-100 text-grayscale-600
        disabled:text-grayscale-300 disabled:hover:bg-grayscale-50 disabled:cursor-not-allowed'
          onClick={handleLinkSubmit}
          disabled={!ogData}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LinkModal;
