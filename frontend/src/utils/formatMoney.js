export function splitMoney(amount) {
  const [dollars, cents] = amount.toFixed(2).split(".");
  return { dollars: Number(dollars).toLocaleString("en-US"), cents };
}
