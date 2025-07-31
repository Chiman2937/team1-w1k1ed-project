import * as cheerio from 'cheerio';

export interface HtmlHeadingItems {
  level: number;
  text: string;
  id: string | null;
}

export const getHtmlHeadings = (html: string): HtmlHeadingItems[] => {
  const $ = cheerio.load(html);
  const headings: HtmlHeadingItems[] = [];

  $('h1, h2, h3, h4, h5, h6').each((_, elem) => {
    const tagName = elem.tagName.toLowerCase(); // ex) 'h2'
    const level = parseInt(tagName[1]); // '2' → 2
    const text = $(elem).text().trim();
    const id = $(elem).attr('id') || null;

    headings.push({ level, text, id });
  });

  return headings;
};
