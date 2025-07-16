import localFont from 'next/font/local';

export const Pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/PretendardVariable.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--pretendard',
});

export const nexonGothicBold = localFont({
  src: [
    {
      path: '../assets/fonts/NEXONLv1GothicBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--nexon-gothic-bold',
});

export const nexonGothicLight = localFont({
  src: [
    {
      path: '../assets/fonts/NEXONLv1GothicLight.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--nexon-gothic-light',
});

export const nexonGothicRegular = localFont({
  src: [
    {
      path: '../assets/fonts/NEXONLv1GothicRegular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--nexon-gothic-regular',
});
