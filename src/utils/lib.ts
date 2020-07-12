export const compareStrings = (a: string, b: string) => {
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  return 0;
};

export const compareStringsReverse = (a: string, b: string) => {
  if (a.toLowerCase() > b.toLowerCase()) return -1;
  if (a.toLowerCase() < b.toLowerCase()) return 1;
  return 0;
};
