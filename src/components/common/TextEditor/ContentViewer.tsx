import './viewer/viewerHtmlStyle.css';
import './viewer/viewerOGStyle.css';
import './viewer/viewerLocalVideoStyle.css';
import './viewer/viewerYoutubeStyle.css';
import './viewer/viewerImageStyle.css';

import DOMPurify from 'dompurify';
import { getHtmlStringIsEmpty } from './utils/handlers/getHtmlStringIsEmpty';

interface Props {
  content: string;
}

const ContentViewer = ({ content }: Props) => {
  const htmlString = content;
  const sanitized = DOMPurify.sanitize(htmlString);

  const isEmpty = getHtmlStringIsEmpty(content);

  if (isEmpty) return null;

  return (
    <div>
      <div className='text-viewer' dangerouslySetInnerHTML={{ __html: sanitized }} />
    </div>
  );
};

export default ContentViewer;
