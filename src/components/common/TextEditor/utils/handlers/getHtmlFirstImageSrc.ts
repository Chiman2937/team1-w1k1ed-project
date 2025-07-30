export const getHtmlFirstImageSrc = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') ?? null;
};
