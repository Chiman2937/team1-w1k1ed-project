import { truncateText } from '@/utils/truncateText';

export interface OgData {
  title: string;
  description: string;
  image: string;
}

export interface OgLinkData {
  title: string;
  description: string;
  image: string;
  url: string;
}

interface Props {
  ogLinkData: OgLinkData;
}

const isYoutubeUrl = (url: string) => {
  return /youtube\.com|youtu\.be/.test(url);
};

const extractYoutubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const OGLink = ({ ogLinkData }: Props) => {
  const { title, description, image, url } = ogLinkData;

  if (isYoutubeUrl(url)) {
    const videoId = extractYoutubeId(url);
    if (!videoId) return null;

    return (
      <div className='w-full aspect-video'>
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <a href={url} className='group'>
      <div className='border-1 border-grayscale-300 w-[450px] flex flex-row items-center shadow-sm bg-white group-hover:bg-grayscale-100'>
        <div
          className='w-[120px] h-[120px]'
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            flexShrink: 0,
          }}
        />
        {/* <img src={image} alt='OG Preview Image' className='w-full h-full object-cover'></img> */}
        <div className='px-[25px]'>
          <span className='block text-xl-semibold text-grayscale-600 h-[36px] pb-1'>
            {truncateText(title, 25)}
          </span>
          <span className='block text-sm-medium text-gray-400 h-[30px] pb-2'>
            {truncateText(description, 30)}
          </span>
          <span className='block text-sm-medium text-green-500'>{truncateText(url, 40)}</span>
        </div>
      </div>
    </a>
  );
};

export default OGLink;
