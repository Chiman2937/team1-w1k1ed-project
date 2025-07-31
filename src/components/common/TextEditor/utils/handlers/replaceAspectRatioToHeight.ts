'use client';
export const replaceAspectRatioToHeight = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const imgs = doc.querySelectorAll('img');

  imgs.forEach((img) => {
    const style = img.getAttribute('style') ?? '';
    const widthStr = img.getAttribute('width');
    const width = widthStr ? parseInt(widthStr) : null;

    // aspect-ratio 파싱
    const match = style.match(/aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/);
    if (match && width) {
      const [, w, h] = match;
      const aspectRatio = parseFloat(w) / parseFloat(h);
      const height = Math.round(width / aspectRatio);

      // height 속성 삽입
      img.setAttribute('height', String(height));

      // style에서 aspect-ratio 제거
      const cleanedStyle = style.replace(/aspect-ratio:\s*\d+\s*\/\s*\d+;?/g, '').trim();
      if (cleanedStyle) {
        img.setAttribute('style', cleanedStyle);
      } else {
        img.removeAttribute('style');
      }
    }
  });

  return doc.body.innerHTML;
};
