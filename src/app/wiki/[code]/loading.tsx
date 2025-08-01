import LoadingOverlay from '@/components/common/LoadingOverlay';

const Loading = () => {
  console.log('로딩중');
  return (
    <div>
      로딩중<LoadingOverlay>페이지를 불러오고 있어요</LoadingOverlay>
    </div>
  );
};

export default Loading;
