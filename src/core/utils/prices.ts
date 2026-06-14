export const getPrice = (date: string) => {
  const calculatedPrice = Number((19.99 - (2026 - Number(date.slice(0, 4)))).toFixed(2));
  return calculatedPrice > 4.99 ? calculatedPrice : 4.99;
};
