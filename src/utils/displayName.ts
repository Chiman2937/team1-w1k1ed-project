export const getDisplayName = (storedName: string): string => {
  if (storedName.length > 2) {
    return storedName.slice(0, -2); // 이름에서 마지막 2자리 숫자를 제외한 부분 반환
  }
  // 만약 이름이 1자리이거나 뒤의 숫자가 없는 경우(그럴일이 없긴 하지만) - 오류 방지
  return storedName;
};
