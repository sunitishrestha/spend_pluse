export function splitMoney(amount) {
  const [dollars, cents] = amount.toFixed(2).split(".");
  return { dollars: Number(dollars).toLocaleString("en-US"), cents };
}

export const money = (n) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
