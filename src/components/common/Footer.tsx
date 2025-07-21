const Footer = () => {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500 overflow-hidden'>
      <footer
        className='text-left bg-grayscale-600 text-white font-pretendard
      px-[20px] py-[40px]'
      >
        <div
          className=' m-auto
          w-[335px]
          md:w-[646px] 
          lg:w-[924px]'
        >
          <p
            className='
          text-[10px]
          md:text-[16px]'
          >
            Copyright ⓒ Wikied. All Rights Reserved
          </p>
          <div
            className='
          text-[8px] mt-[10px] mb-[20px]
          md:text-[14px] md:mb-[30px]'
          >
            <p>사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은</p>
            <p>서울특별시 중구 청계천로 123, 위키드빌딩</p>
          </div>
          <div
            className='flex gap-[30px] 
          text-[8px] my-[20px]
          md:text-[14px] 
          '
          >
            <p>서비스 이용 약관</p>
            <p>개인정보 취급방침</p>
            <p>전자금융거래 기본약관</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
