export const stringToNumber = value => {
  if (Number(value)) {
    return Number(value);
  }
  return 0;
};
