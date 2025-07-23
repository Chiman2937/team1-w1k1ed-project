import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const TestSpinner = () => {
  return (
    <div className='p-10 flex flex-col gap-5 items-center'>
      <LoadingSpinner.dotBounce dotCount={5} dotSize={15} dotGap={10} />
      <LoadingSpinner.dotCircle dotCount={8} dotSize={12} distanceFromCenter={30} />
      <LoadingSpinner.lineCircle lineWeight={8} distanceFromCenter={30} />
      <LoadingSpinner.lineCircle lineWeight={3} distanceFromCenter={6} />
    </div>
  );
};

export default TestSpinner;
