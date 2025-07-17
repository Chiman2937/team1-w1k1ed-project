// 글자 수가 너무 길면 자르고 뒤에 원하는 문자(suffix) 붙이기
export const truncateText = (text: string, maxLength: number = 10, suffix: string = '...') => {
  if (!text || text.length <= maxLength) return text;

  // suffix 길이를 고려한 자르기
  const actualMaxLength = maxLength - suffix.length;
  return actualMaxLength > 0
    ? `${text.slice(0, actualMaxLength)}${suffix}`
    : text.slice(0, maxLength);
};
