import { getProfileItemAPI } from '@/api/profile/getProfileAPI';
import WikiDetailSection from '@/components/page/wikicode/WikiDetailSection';
import { WikiProvider } from '@/context/WikiContext';
import clsx from 'clsx';

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

const WikiDetail = async ({ params }: PageProps) => {
  const { code } = await params;
  const wikiData = await getProfileItemAPI({ code });

  return (
    <WikiProvider>
      <section
        className={clsx('relative', 'mx-auto', 'px-[20px] py-[40px]', 'md:px-[60px] md:py-[60px]')}
      >
        <WikiDetailSection wikiData={wikiData} />
      </section>
    </WikiProvider>
  );
};

export default WikiDetail;
