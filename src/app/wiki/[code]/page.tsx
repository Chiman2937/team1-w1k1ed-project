import WikiDetailSection from '@/components/page/wikicode/WikiDetailSection';
import clsx from 'clsx';

export interface WikiCodeRes {
  id: number;
  code: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

const WikiDetail = async ({ params }: PageProps) => {
  const { code } = await params;
  const res = await fetch(`https://wikied-api.vercel.app/1/profiles/${code}`);
  const data = (await res.json()) as WikiCodeRes;

  return (
    <section
      className={clsx(
        'relative',
        'mx-auto',
        'px-[20px] py-[40px]',
        'md:px-[60px] md:py-[60px]',
        '2xl:px-0 2xl:py-[80px] 2xl:max-w-[1010px] 2xl:pr-[150px]',
      )}
    >
      <WikiDetailSection wikiData={data} />
    </section>
  );
};

export default WikiDetail;
