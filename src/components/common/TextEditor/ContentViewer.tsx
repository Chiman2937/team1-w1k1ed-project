import './viewer/viewerHtmlStyle.css';
import './viewer/viewerOGStyle.css';
import './viewer/viewerLocalVideoStyle.css';
import './viewer/viewerYoutubeStyle.css';
import './viewer/viewerImageStyle.css';

import DOMPurify from 'dompurify';

interface Props {
  content: string;
}

const ContentViewer = ({ content }: Props) => {
  const htmlString = content;
  const sanitized = DOMPurify.sanitize(htmlString);

  return (
    <div>
      <div className='text-viewer' dangerouslySetInnerHTML={{ __html: sanitized }} />
    </div>
  );
};

export default ContentViewer;
