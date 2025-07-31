import * as cheerio from 'cheerio';

export const removeHeadingIds = (html: string): string => {
  const $ = cheerio.load(html);

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    $(el).removeAttr('id');
  });

  return $('body').html() || '';
};
