import * as cheerio from 'cheerio';

export const addIdToHeadings = (html: string): string => {
  const $ = cheerio.load(html);
  const countMap: Record<string, number> = {};

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = el.tagName.toLowerCase(); // 'h1', 'h2', ...
    countMap[tag] = (countMap[tag] || 0) + 1;

    const id = `${tag}-${countMap[tag]}`;
    $(el).attr('id', id);
  });

  return $('body').html() || '';
};
