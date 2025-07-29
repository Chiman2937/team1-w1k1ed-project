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
        className={clsx(
          'lg:px-[20px] lg:py-[20px] lg:w-full lg:pr-[280px] xl:pl-[230px] lg:mx-auto',
        )}
      >
        <WikiDetailSection wikiData={wikiData} />
      </section>
    </WikiProvider>
  );
};

export default WikiDetail;
