import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  activeBy: boolean;
}

export const useUnloadAlert = ({ activeBy }: Props) => {
  const router = useRouter();

  // 새로고침/닫기 시 브라우저 확인창 띄우기
  useEffect(() => {
    if (!activeBy) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // 브라우저 기본 메시지 표시
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeBy]);

  useEffect(() => {
    if (!activeBy) return;
    const navLinks = document.querySelectorAll('a');

    const handleClick = (e: Event) => {
      e.preventDefault();
      const targetElement = e.currentTarget as HTMLAnchorElement;
      const targetAttr = targetElement.getAttribute('target');

      if (targetAttr === '_blank') return;
      const userConfirm = confirm(
        '정말 이 페이지를 떠나시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.',
      );

      if (userConfirm) {
        const href = targetElement.getAttribute('href');
        if (!href) return;
        router.push(href);
      }
    };

    navLinks.forEach((link) => link.addEventListener('click', handleClick));

    return () => {
      navLinks.forEach((link) => link.removeEventListener('click', handleClick));
    };
  }, [activeBy, router]);
};
