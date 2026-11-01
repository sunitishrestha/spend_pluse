import { MoreVertical, PieChart } from "lucide-react";
import { money } from "../../utils/formatMoney";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CategoryDonut({ items }) {
  const total = items.reduce((sum, i) => sum + i.amount, 0);
  const top = [...items].sort((a, b) => b.amount - a.amount)[0];
  const topPercent = Math.round((top.amount / total) * 100);

  // Work out each segment's length and start position without changing any variable
  const segments = items.map((item, index) => {
    const amountBefore = items
      .slice(0, index)
      .reduce((sum, i) => sum + i.amount, 0);
    return {
      ...item,
      length: (item.amount / total) * CIRCUMFERENCE,
      offset: (amountBefore / total) * CIRCUMFERENCE,
    };
  });

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold">Spending by Category</h2>
          <p className="text-sm text-slate-600">
            Breakdown across active ledger groups
          </p>
        </div>
        <button aria-label="More options" className="text-slate-500">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <div className="relative h-44 w-44 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            {segments.map((seg) => (
              <circle
                key={seg.name}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeDasharray={`${seg.length} ${CIRCUMFERENCE - seg.length}`}
                strokeDashoffset={-seg.offset}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs tracking-wider text-slate-600">TOTAL</span>
            <span className="text-xl font-semibold">
              ${Math.round(total).toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <ul className="min-w-[200px] flex-1 space-y-3 text-sm">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span className="text-right">
                <span className="block font-medium">{money(item.amount)}</span>
                <span className="text-xs text-slate-600">
                  {Math.round((item.amount / total) * 100)}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-blue-50/70 p-4 text-sm">
        <span className="flex items-center gap-3">
          <PieChart size={18} className="shrink-0 text-blue-700" />
          Dominant: {top.name} accounts for {topPercent}% of net spend
        </span>
        <button className="text-xs font-semibold text-blue-700 hover:underline">
          Inspect
        </button>
      </div>
    </section>
  );
}
