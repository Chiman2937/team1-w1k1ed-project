import * as cheerio from 'cheerio';

export const replaceAspectRatioToHeight = (html: string): string => {
  const $ = cheerio.load(html);

  $('img').each((_, img) => {
    const $img = $(img);

    const style = $img.attr('style') ?? '';
    const widthStr = $img.attr('width');
    const width = widthStr ? parseInt(widthStr, 10) : null;

    // aspect-ratio: w / h 추출
    const match = style.match(/aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/);
    if (match && width) {
      const [, w, h] = match;
      const aspectRatio = parseFloat(w) / parseFloat(h);
      const height = Math.round(width / aspectRatio);

      // height 속성 추가
      $img.attr('height', String(height));

      // style에서 aspect-ratio 제거
      const cleanedStyle = style.replace(/aspect-ratio:\s*\d+\s*\/\s*\d+;?/g, '').trim();
      if (cleanedStyle) {
        $img.attr('style', cleanedStyle);
      } else {
        $img.removeAttr('style');
      }
    }
  });

  return $('body').html() || '';
};
