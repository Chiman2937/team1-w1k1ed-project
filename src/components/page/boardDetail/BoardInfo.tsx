const TITLE_MAX_LEN = 30;

interface PostFormProps {
  title: string;
  setTitle: (title: string) => void;
}

const BoardInfoForm: React.FC<PostFormProps> = ({ title, setTitle }) => {
  return (
    <>
      <div>
        <div className='mt-1 border-t border-grayscale-200' />
        <div className='flex items-center justify-between gap-2'>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className='flex-1 rounded-sm py-3 text-lg-medium outline-none md:text-xl-medium text-grayscale-600'
            placeholder='제목을 입력해주세요'
            maxLength={TITLE_MAX_LEN}
          />
          <span className='text-xs-medium md:text-md-medium text-gray-500'>
            {!title ? 0 : title.length}/
            <span className='text-primary-green-200'>{TITLE_MAX_LEN}</span>
          </span>
        </div>
        <div className='border-t  border-grayscale-200' />
      </div>
    </>
  );
};

export default BoardInfoForm;
