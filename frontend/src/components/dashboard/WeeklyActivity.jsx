import { money } from "../../utils/formatMoney";

export default function WeeklyActivity({ data }) {
  const max = Math.max(...data.map((d) => d.amount));
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-600">
            Activity
          </p>
          <h2 className="font-semibold">Spending this Week</h2>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-100" /> Past days
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-700" /> Today
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-56 items-end gap-3 sm:gap-6">
        {data.map((d) => (
          <div
            key={d.day}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            {d.today && (
              <span className="text-xs font-semibold text-blue-700">
                {money(d.amount)}
              </span>
            )}
            <div
              className={`w-full rounded-t-md ${d.today ? "bg-blue-700" : "bg-blue-100"}`}
              style={{ height: `${(d.amount / max) * 75}%` }}
            />
            <span
              className={`text-xs ${d.today ? "font-semibold text-blue-700" : "text-slate-600"}`}
            >
              {d.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
        <span className="text-slate-600">Weekly Total so far</span>
        <span className="text-lg font-semibold">{money(total)}</span>
      </div>
    </section>
  );
}
