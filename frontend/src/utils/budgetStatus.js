export function budgetStatus(spent, limit) {
  const percent = (spent / limit) * 100;
  const warn = percent >= 80;

  return {
    percent,
    chip: warn
      ? "bg-orange-100 text-orange-800"
      : "bg-emerald-100 text-emerald-800",
    bar: warn ? "bg-amber-700" : "bg-emerald-800",
    left: warn ? "text-amber-800" : "text-emerald-700",
  };
}
