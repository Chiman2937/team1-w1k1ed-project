// utils/createWrapper.ts
export function createWrapperElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  {
    className = '',
    style = {},
    children = [],
  }: {
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    children?: HTMLElement[];
  } = {},
): HTMLElementTagNameMap[K] {
  const wrapper = document.createElement(tagName);
  wrapper.className = className;

  Object.assign(wrapper.style, style);
  children.forEach((child) => wrapper.appendChild(child));

  return wrapper as HTMLElementTagNameMap[K];
}
