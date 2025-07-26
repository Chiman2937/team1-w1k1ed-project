import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import ProfileField from './ProfileField';

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

  return (
    <div className='flex flex-col gap-[10px]'>
      {fieldMap.map(([label, value]) => (
        <ProfileField key={label}>
          <ProfileField.label>{label}</ProfileField.label>
          <ProfileField.value>{value}</ProfileField.value>
        </ProfileField>
      ))}
    </div>
  );
};

export default ProfileItemListViewer;
