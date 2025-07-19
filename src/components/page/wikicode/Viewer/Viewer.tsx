import { WikiCodeRes } from '@/app/wiki/[code]/page';
import ProfileViewer from './ProfileViewer/ProfileViewer';
import TitleViewer from './TitleViewer/TitleViewer';

interface Props {
  wikiData: WikiCodeRes;
}

const WikiViewer = ({ wikiData }: Props) => {
  return (
    <>
      <TitleViewer wikiData={wikiData} />
      <ProfileViewer wikiData={wikiData} />
    </>
  );
};

export default WikiViewer;
