import { TrendingDown } from "lucide-react";
import { money } from "../../utils/formatMoney";

const SCALE_MAX = 3600; // top of the chart in dollars

export default function TrendChart({ data, target }) {
  const average = data.reduce((sum, d) => sum + d.amount, 0) / data.length;
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  const change = ((previous.amount - current.amount) / previous.amount) * 100;
  const capLine = (target / SCALE_MAX) * 100;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">Monthly Spending Trend</h2>
          <p className="text-sm text-slate-600">
            Trailing 6-month historical outlays versus monthly baseline
          </p>
        </div>
        <span className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-4 border-t border-dashed border-slate-500" />
          Target: {money(target).replace(".00", "")}
        </span>
      </div>

      <div className="relative mt-8 h-56">
        <div
          className="absolute inset-x-0 border-t border-dashed border-slate-300"
          style={{ bottom: `${capLine}%` }}
        />
        <span
          className="absolute right-0 -translate-y-full pb-1 text-xs text-slate-600"
          style={{ bottom: `${capLine}%` }}
        >
          {money(target).replace(".00", "")} cap
        </span>

        <div className="flex h-full items-end gap-4 sm:gap-8">
          {data.map((d) => {
            const over = d.amount > target;
            const color = d.current
              ? "bg-blue-700"
              : over
                ? "bg-red-200"
                : "bg-blue-100";
            return (
              <div
                key={d.month}
                className="flex h-full flex-1 flex-col justify-end"
              >
                {d.current && (
                  <span className="mb-1 text-center text-xs font-semibold text-blue-700">
                    ${(d.amount / 1000).toFixed(2)}K
                  </span>
                )}
                <div
                  className={`w-full rounded-t-md ${color}`}
                  style={{ height: `${(d.amount / SCALE_MAX) * 100}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex gap-4 sm:gap-8">
        {data.map((d) => (
          <span
            key={d.month}
            className={`flex-1 text-center text-sm ${d.current ? "font-semibold text-blue-700" : "text-slate-700"}`}
          >
            {d.month}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-slate-700">
          Average velocity: <b>{money(average).replace(/\.\d\d$/, "")}/mo</b>
        </span>
        <span className="flex items-center gap-1.5 text-emerald-800">
          <TrendingDown size={16} /> {change.toFixed(1)}% less than September
        </span>
      </div>
    </section>
  );
}
