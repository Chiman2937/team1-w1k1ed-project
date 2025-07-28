import { type Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './styles/**/*.{css,scss}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '5xl-semibold': ['48px', { lineHeight: '46px', fontWeight: '600' }],
        '4xl-bold': ['40px', { lineHeight: '42px', fontWeight: '700' }],
        '3xl-bold': ['32px', { lineHeight: '46px', fontWeight: '700' }],
        '3xl-semibold': ['32px', { lineHeight: '42px', fontWeight: '600' }],
        '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'xl-bold': ['20px', { lineHeight: '32px', fontWeight: '700' }],
        'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: '600' }],
        'xl-medium': ['20px', { lineHeight: '32px', fontWeight: '500' }],
        'xl-regular': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: '500' }],
        '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: '400' }],
        'lg-bold': ['16px', { lineHeight: '26px', fontWeight: '700' }],
        'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: '600' }],
        'lg-medium': ['16px', { lineHeight: '26px', fontWeight: '500' }],
        'lg-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'md-bold': ['14px', { lineHeight: '24px', fontWeight: '700' }],
        'md-semibold': ['14px', { lineHeight: '24px', fontWeight: '600' }],
        'md-medium': ['14px', { lineHeight: '24px', fontWeight: '500' }],
        'md-regular': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: '600' }],
        'sm-medium': ['13px', { lineHeight: '22px', fontWeight: '500' }],
        'xs-semibold': ['12px', { lineHeight: '20px', fontWeight: '600' }],
        'xs-medium': ['12px', { lineHeight: '20px', fontWeight: '500' }],
        'xs-regular': ['12px', { lineHeight: '20px', fontWeight: '400' }],
      },
      boxShadow: {
        card: '0px 4px 20px rgba(0, 0, 0, 0.08)',
      },
      forms: {
        DEFAULT: {
          checkbox: {
            color: 'primary-green-200',
          },
        },
      },
    },
  },
  plugins: [forms],
};

export default config;
