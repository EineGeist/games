export const sortStrings = (a: string, b: string) => {
  if (a.toLowerCase() > b.toLocaleLowerCase()) return 1;
  if (a.toLowerCase() < b.toLocaleLowerCase()) return -1;
  return 0;
};

export const sortStringsReverse = (a: string, b: string) => {
  if (a.toLowerCase() > b.toLocaleLowerCase()) return -1;
  if (a.toLowerCase() < b.toLocaleLowerCase()) return 1;
  return 0;
};
