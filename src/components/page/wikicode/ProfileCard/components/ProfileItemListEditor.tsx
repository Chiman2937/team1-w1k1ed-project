import { GetProfileItemResponse } from '@/api/profile/getProfileAPI';
import ProfileField from './ProfileField';
import { useWikiContext } from '@/context/WikiContext';
import { ChangeEvent } from 'react';

const ProfileItemListEditor = () => {
  const { wikiProfile, setWikiProfile } = useWikiContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof GetProfileItemResponse;
    const value = e.target.value;
    setWikiProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  if (!wikiProfile) return;

  const fieldMap: [string, string, string][] = [
    ['거주 도시', 'city', wikiProfile.city],
    ['MBTI', 'mbti', wikiProfile.mbti],
    ['직업', 'job', wikiProfile.job],
    ['SNS', 'sns', wikiProfile.sns],
    ['생년월일', 'birthday', wikiProfile.birthday],
    ['닉네임', 'nickname', wikiProfile.nickname],
    ['혈액형', 'bloodType', wikiProfile.bloodType],
    ['국적', 'nationality', wikiProfile.nationality],
  ];

  return (
    <div className='flex flex-col gap-[10px] grow'>
      {fieldMap.map(([label, id, value]) => (
        <ProfileField key={label}>
          <ProfileField.label>{label}</ProfileField.label>
          <ProfileField.input id={id} value={value} onChange={handleInputChange} />
        </ProfileField>
      ))}
    </div>
  );
};

export default ProfileItemListEditor;
