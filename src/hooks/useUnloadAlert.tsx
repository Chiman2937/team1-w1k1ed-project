import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Props {
  activeBy: boolean;
}

export const useUnloadAlert = ({ activeBy }: Props) => {
  const router = useRouter();
  const enabled = useRef(false);

  const handleBeforeUnload = useRef((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  });

  const handleClick = useRef((e: Event) => {
    e.preventDefault();
    const targetElement = e.currentTarget as HTMLAnchorElement;
    const targetAttr = targetElement.getAttribute('target');
    if (targetAttr === '_blank') return;

    const userConfirm = confirm(
      '정말 이 페이지를 떠나시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.',
    );

    if (userConfirm) {
      const href = targetElement.getAttribute('href');
      if (href) router.push(href);
    }
  });

  useEffect(() => {
    if (!activeBy) return;

    const beforeUnloadHandler = handleBeforeUnload.current;
    const clickHandler = handleClick.current;

    window.addEventListener('beforeunload', beforeUnloadHandler);
    const navLinks = document.querySelectorAll('a');
    navLinks.forEach((link) => link.addEventListener('click', clickHandler));

    enabled.current = true;

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      navLinks.forEach((link) => link.removeEventListener('click', clickHandler));
      enabled.current = false;
    };
  }, [activeBy, router]);

  const disable = () => {
    if (!enabled.current) return;
    window.removeEventListener('beforeunload', handleBeforeUnload.current);

    const navLinks = document.querySelectorAll('a');
    navLinks.forEach((link) => link.removeEventListener('click', handleClick.current));

    enabled.current = false;
  };

  return { disable };
};
