import LandingUserOnboarding from '../assets/images/type=image1.svg';
import LandingTypingKeyboard from '../assets/images/type=image2.svg';
import LandingChatDark from '../assets/images/type=image3.svg';
import LandingChatLight from '../assets/images/type=image4.svg';
import LandingFaqChat from '../assets/images/type=image5.svg';
import LandingNotificationBell from '../assets/images/type=image6.svg';
import LandingAnnouncementMegaphone from '../assets/images/type=image7.svg';
import LandingCompanyLogoW from '../assets/images/type=image8.svg';
import LandingAppUpdate from '../assets/images/type=image9.svg';
import LandingDialogBubbles from '../assets/images/type=image10.svg';

export default function Home() {
  return (
    <div className='w-full text-center mx-auto bg-grayscale-100 text-grayscale-500'>
      <main
        className='mx-auto
        w-[335px]
        md:w-[646px] 
        lg:w-[924px]'
      >
        <section
          className='px-[20px] py-[100px]'
          // style={{
          //   backgroundImage: `url('../../public/bgImage.svg')`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          //   backgroundRepeat: 'no-repeat',
          // }}
        >
          <h1 className='font-nexon-gothic-light text-[40px] relative z-10'>
            남들이 만드는 <br />
            <span className='font-nexon-gothic-bold text-[60px]'>나만의 위키</span>
          </h1>
          <div className='relative z-10'>
            <button
              className='mx-[40px] px-[20px] py-[15px] rounded-[15px] font-pretendard  transition bg-grayscale-500 text-white hover:bg-grayscale-600
            font-[20px]
            md:font-[24px]'
            >
              위키 만들기
            </button>
            <LandingUserOnboarding alt='사용자 온보딩 문서' className='my-[44px] mx-auto' />
          </div>

          <div
            className='flex w-full
            gap-[10px] py-[100px]
            md:py-[153px]
            lg:py-[193px]
            '
          >
            <div className='text-left '>
              <h3
                className='text-primary-green-200 font-nexon-gothic-bold
              text-[10px] 
              md:text-[20px]
              lg:text-[30px]'
              >
                WRITE
              </h3>
              <h2
                className='font-nexon-gothic-regular mt-[10px] mb-[30px]
              text-[16px] 
              md:text-[32px]
              lg:text-[50px]'
              >
                친구의 위키,
                <br />
                직접 작성해 봐요
              </h2>
              <div
                className='bg-primary-green-200 border border-none rounded-[10px]
                w-[133px] h-auto
                md:w-[262px] md:h-[322px]
                lg:w-[364px] lg:h-[450px]'
              >
                <LandingTypingKeyboard
                  alt='키보드 타이핑'
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
            <LandingChatDark
              alt='다크 테마 채팅 화면'
              className='
              w-[192px] h-[250px]
              md:w-[365px] md:h-[479px]
              lg:w-[520px] lg:h-[681px]'
            />
          </div>
        </section>

        <section className='px-[20px] py-[100px] bg-gray-50'>
          <div className='text-right my-[40px]'>
            <h3
              className='text-primary-green-200 font-nexon-gothic-bold 
              text-[10px]
              md:text-[20px]
              lg:text-[30px]'
            >
              SHARE
            </h3>
            <h2
              className='font-nexon-gothic-regular mt-[10px] mb-[30px]
              text-[16px] 
              md:text-[32px]
              lg:text-[50px]'
            >
              내 위키 만들고
              <br />
              친구에게 공유해요
            </h2>
          </div>

          <div className='w-screen max-w-none flex gap-[10px]'>
            <LandingAnnouncementMegaphone
              alt='공지 메가폰 아이콘'
              className=' bg-secondary-purple-50 border border-none rounded-[10px]'
            />
            <LandingCompanyLogoW
              alt='회사 로고'
              className=' bg-primary-green-150 border border-none rounded-[10px]'
            />
            <LandingAppUpdate
              alt='앱 업데이트 화면'
              className='bg-grayscale-250 border border-none rounded-[10px]'
            />
            <LandingDialogBubbles
              alt='대화 말풍선'
              className='bg-grayscale-250 border border-none rounded-[10px]'
            />
          </div>
        </section>

        <section className='px-[20px] py-[100px]'>
          <div className='text-left'>
            <h3
              className='text-primary-green-200 font-nexon-gothic-bold text-[10px]
            md:text-[20px]
            lg:text-[30px]'
            >
              VIEW
            </h3>
            <h2
              className='font-nexon-gothic-regular mt-[10px] mb-[30px]
              text-[16px] 
              md:text-[32px]
              lg:text-[50px]'
            >
              친구들이 달아준
              <br />
              내용을 확인해 봐요
            </h2>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <LandingChatLight alt='밝은 테마 채팅 화면' />
            <div className='flex gap-[10px]'>
              <LandingNotificationBell
                alt='알림 종 아이콘'
                className='bg-secondary-purple-100 border border-none rounded-[10px]'
              />
              <LandingFaqChat alt='FAQ 채팅 버블' />
            </div>
          </div>
        </section>
      </main>

      <section className='flex flex-col gap-[40px] bg-grayscale-500 text-center text-white px-[31px] py-[100px]'>
        <div
          className=' m-auto
          w-[335px]
          md:w-[646px] 
          lg:w-[924px]'
        >
          <h1
            className='font-nexon-gothic-bold
          text-[30px]
          md:text-[60px]'
          >
            나만의 위키 만들어 보기
          </h1>
          <button
            className='mx-[40px] my-[40px] px-[20px] py-[15px] rounded-[15px] font-pretendard font-semibold transition bg-white text-grayscale-500 
          text-[20px]
          md:text-[24px]'
          >
            지금 시작하기
          </button>
        </div>
      </section>

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
}
