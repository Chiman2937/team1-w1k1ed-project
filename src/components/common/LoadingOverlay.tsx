import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

interface Props {
  children: React.ReactNode;
}

const LoadingOverlay = ({ children }: Props) => {
  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center gap-[20px] z-40 bg-white'>
      <p className='text-2xl-medium text-primary-green-300'>{children}</p>
      <LoadingSpinner.dotBounce
        themeColor='var(--color-primary-green-300)'
        dotCount={6}
        dotSize={10}
        dotGap={5}
        bounceHeight={5}
        bounceSpeed={0.1}
      />
    </div>
  );
};

export default LoadingOverlay;
