import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const TestSpinner = () => {
  return (
    <div className='p-10 flex flex-col gap-5 items-center'>
      <LoadingSpinner.dotBounce
        themeColor='var(--color-primary-green-300)'
        dotCount={5}
        dotSize={15}
        dotGap={10}
        bounceHeight={5}
        bounceSpeed={0.15}
      />
      <LoadingSpinner.dotBounce
        themeColor='var(--color-primary-green-300)'
        dotCount={12}
        dotSize={10}
        dotGap={5}
        bounceHeight={5}
        bounceSpeed={0.1}
      />
      <LoadingSpinner.dotCircle
        themeColor='var(--color-primary-green-300)'
        dotCount={8}
        dotSize={12}
        distanceFromCenter={30}
      />
      <LoadingSpinner.dotCircle
        themeColor='var(--color-primary-green-300)'
        dotCount={20}
        dotSize={3}
        distanceFromCenter={15}
      />
      <LoadingSpinner.lineCircle
        themeColor='var(--color-primary-green-300)'
        lineWeight={8}
        distanceFromCenter={30}
        spinSpeed={2}
      />
      <LoadingSpinner.lineCircle
        themeColor='var(--color-primary-green-300)'
        lineWeight={3}
        distanceFromCenter={6}
        spinSpeed={1}
      />
    </div>
  );
};

export default TestSpinner;
