export const removeHeadingIds = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((el) => {
    el.removeAttribute('id');
  });

  return doc.body.innerHTML;
};
