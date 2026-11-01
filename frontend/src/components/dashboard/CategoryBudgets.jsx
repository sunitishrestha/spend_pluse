import { MoreHorizontal, AlertTriangle } from "lucide-react";
import { CATEGORY_STYLES } from "../../constants/categories";
import { money } from "../../utils/formatMoney";

export default function CategoryBudgets({ items }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-600">
            Allocation
          </p>
          <h2 className="font-semibold">Budget by Category</h2>
        </div>
        <button aria-label="More options" className="text-slate-500">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {items.map((c) => {
          const style = CATEGORY_STYLES[c.name] ?? CATEGORY_STYLES.Other;
          const Icon = style.icon;
          const percent = Math.round((c.spent / c.limit) * 100);

          return (
            <div key={c.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <Icon size={16} className={style.text} /> {c.name}
                </span>
                <span className="text-xs text-slate-600">
                  <b className={c.warn ? "text-amber-700" : ""}>{percent}%</b>{" "}
                  (${c.spent} / ${c.limit})
                </span>
              </div>

              <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${style.bar}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1 ${style.text}`}>
                  {c.warn && <AlertTriangle size={12} />} {c.note}
                </span>
                <span className="text-slate-600">
                  {money(c.limit - c.spent)} left
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
