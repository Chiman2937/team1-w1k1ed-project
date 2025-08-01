import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import ProfileField from './ProfileField';
import clsx from 'clsx';
interface Props {
  wikiData: GetProfileItemResponse;
}

const ProfileItemListViewer = ({ wikiData }: Props) => {
  const fieldMap = [
    ['거주 도시', wikiData.city],
    ['MBTI', wikiData.mbti],
    ['직업', wikiData.job],
    ['SNS', wikiData.sns],
    ['생년월일', wikiData.birthday],
    ['닉네임', wikiData.nickname],
    ['혈액형', wikiData.bloodType],
    ['국적', wikiData.nationality],
  ];

  const filledMap = fieldMap.filter(([_, value]) => value !== '');
  const emptyMap = fieldMap.filter(([_, value]) => value === '');

  return (
    <div className='flex flex-col gap-[10px] overflow-hidden'>
      {filledMap.length > 0 &&
        filledMap.map(([label, value]) => (
          <ProfileField key={label}>
            <ProfileField.label>{label}</ProfileField.label>
            {label !== 'SNS' && <ProfileField.value>{value}</ProfileField.value>}
            {label === 'SNS' && <ProfileField.link>{value}</ProfileField.link>}
          </ProfileField>
        ))}
      {emptyMap.length > 0 && (
        <>
          {filledMap.length > 0 && <div className='border-b-1 border-gray-200' />}
          <div className='flex flex-row gap-[10px]'>
            <div className='flex flex-col justify-center gap-[10px] shrink-0'>
              {emptyMap.map(([label, _]) => (
                <ProfileField.label key={label}>{label}</ProfileField.label>
              ))}
            </div>
            <div
              className={clsx(
                'grow',
                'bg-gray-100 rounded-[10px] text-center py-[10px]',
                'text-grayscale-400',
                'flex flex-col items-center justify-center',
              )}
            >
              <span className='whitespace-nowrap'>작성된 내용이</span>
              <span className='whitespace-nowrap'>없어요.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileItemListViewer;
