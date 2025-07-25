const BoardSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center animate-pulse'>
      <div
        className='flex-auto my-10 shadow-[0_4px_20px_#00000014] w-full rounded-lg
        sm:w-[335px]
        md:w-[624px]
        xl:w-[1060px]'
      >
        <div className='p-5 bg-grayscale-100'>
          <div className='flex flex-col w-full gap-[30px]'>
            <div className='flex justify-between items-center'>
              <div className='bg-gradient-to-r from-grayscale-300 to-grayscale-200 w-[150px] h-[24px] rounded-xl'></div>
              <div className='flex gap-[14px]'>
                <>
                  <div className='h-[43px] w-[43px] md:w-[120px] xl:w-[120px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl' />
                  <div className='h-[43px] w-[43px] md:w-[120px] xl:w-[120px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl' />
                </>
              </div>
            </div>
            <div className='flex justify-between items-center  text-grayscale-400 text-md-regular pb-5 border-b border-grayscale-200'>
              <div className='flex gap-[10px] '>
                <div className='h-[14px] w-[36px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
                <div className='h-[14px] w-[73px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              </div>
              <div className='h-[14px] w-[50px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl' />
            </div>
            <div className='flex flex-col gap-[20px] min-h-52 overflow-auto md:min-h-72 xl:min-h-100 text-ellipsis'>
              <div className='h-[14px] w-[400px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[350px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[200px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[250px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[200px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[250px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[300px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[350px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
              <div className='h-[14px] w-[500px] bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[140px] h-[45px] justify-center bg-gradient-to-r from-grayscale-300 to-grayscale-200 rounded-xl'></div>
    </div>
  );
};

export default BoardSkeleton;
