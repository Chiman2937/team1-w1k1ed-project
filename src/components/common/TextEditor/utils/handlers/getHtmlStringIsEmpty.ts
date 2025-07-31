import * as cheerio from 'cheerio';

/**
 * HTML 문자열이 실질적으로 "비어있는지" 판별
 * - 텍스트가 없고
 * - 내용 없는 p, br, 공백 문자만 있는 경우 true
 */
export const getHtmlStringIsEmpty = (html: string): boolean => {
  const $ = cheerio.load(html);

  // 텍스트가 없고
  const text = $('body').text().replace(/\s+/g, '').trim();

  // 의미 없는 태그만 있을 경우 (예: <p></p>, <br>)
  const onlyEmptyElements = $('body')
    .children()
    .toArray()
    .every((el) => {
      const $el = $(el);
      const tag = $el[0].tagName.toLowerCase();

      const isEmptyParagraph = tag === 'p' && $el.text().trim() === '';
      const isEmptyBr = tag === 'br';
      return isEmptyParagraph || isEmptyBr;
    });

  return text === '' && onlyEmptyElements;
};
