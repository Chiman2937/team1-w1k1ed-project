import * as cheerio from 'cheerio';

export const getHtmlFirstImageSrc = (html: string): string | null => {
  const $ = cheerio.load(html);
  const img = $('img').first();
  return img.attr('src') ?? null;
};
