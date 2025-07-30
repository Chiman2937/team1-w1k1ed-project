'use client';
export interface HtmlHeadingItems {
  level: number;
  text: string;
  id: string | null;
}

export const getHtmlHeadings = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  return headings.map((el) => ({
    level: parseInt(el.tagName[1]),
    text: el.textContent?.trim() ?? '',
    id: el.id || null,
  }));
};
