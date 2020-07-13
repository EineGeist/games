export const checkForRange = (n: number, min: number, max: number): boolean => {
  return min <= n && n <= max;
};

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
