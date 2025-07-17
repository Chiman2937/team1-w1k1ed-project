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
    <div className='lg:px-[80px] w-full text-center px-[36px] mx-auto bg-grayscale-100'>
      <section className='px-[20px] py-[100px]'>
        <h1 className='font-light text-[40px]'>
          남들이 만드는 <br />
          <span className='font-bold text-[60px]'>나만의 위키</span>
        </h1>
        <div>
          <button className='mx-[40px] px-[20px] py-[15px] rounded-[15px] font-semibold transition bg-gray-500 text-white hover:bg-gray-600'>
            위키 만들기
          </button>
          <LandingUserOnboarding
            alt='사용자 온보딩 문서'
            width={336}
            height={398}
            className='my-[44px]'
          />
        </div>
        <div className='flex gap-[10px]'>
          <div className='text-left'>
            <h3>WRITE</h3>
            <h2>
              친구의 위키,
              <br />
              직접 작성해 봐요
            </h2>
            <LandingTypingKeyboard
              className='bg-green-700 border rounded-[10px]'
              alt='키보드 타이핑'
              width={133}
              height={162}
            />
          </div>
          <LandingChatDark alt='다크 테마 채팅 화면' width={192} height={250} />
        </div>
      </section>

      <section className='px-[20px] py-[100px]'>
        <div className='text-right'>
          <h3>SHARE</h3>
          <h2>
            내 위키 만들고
            <br />
            친구에게 공유해요
          </h2>
        </div>

        <div className='flex gap-[10px]'>
          <LandingAnnouncementMegaphone alt='공지 메가폰 아이콘' width={76} height={76} />
          <LandingCompanyLogoW alt='회사 로고' width={76} height={76} />
          <LandingAppUpdate alt='앱 업데이트 화면' width={76} height={76} />
          <LandingDialogBubbles alt='대화 말풍선' width={76} height={76} />
        </div>
      </section>

      <section className='px-[20px] py-[100px]'>
        <div className='text-left'>
          <h3>VIEW</h3>
          <h2>
            친구들이 달아준
            <br />
            내용을 확인해 봐요
          </h2>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <LandingChatLight alt='밝은 테마 채팅 화면' width={335} height={102} />
          <div className='flex gap-[10px]'>
            <LandingNotificationBell alt='알림 종 아이콘' width={102} height={102} />
            <LandingFaqChat alt='FAQ 채팅 버블' width={223} height={102} />
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-[40px] bg-gray-500 text-center text-white px-[31px] py-[100px]'>
        <h1 className='font-bold text-[30px]'>나만의 위키 만들어 보기</h1>
        <button className='mx-[40px] px-[20px] py-[15px] rounded-[15px] font-semibold transition bg-white text-black '>
          지금 시작하기
        </button>
      </section>

      <footer className='text-left bg-gray-600 text-white px-[20px] py-[40px]'>
        <p className='text-[10px]'>Copyright ⓒ Wikied. All Rights Reserved</p>
        <div className='text-[8px] my-[10px]'>
          <p>사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은</p>
          <p>서울특별시 중구 청계천로 123, 위키드빌딩</p>
        </div>
        <div className='flex gap-[30px] text-[8px] my-[20px]'>
          <p>서비스 이용 약관</p>
          <p>개인정보 취급방침</p>
          <p>전자금융거래 기본약관</p>
        </div>
      </footer>
    </div>
  );
}
