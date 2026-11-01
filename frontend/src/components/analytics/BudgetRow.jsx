import { CATEGORY_STYLES } from "../../constants/categories";
import { budgetStatus } from "../../utils/budgetStatus";
import { money } from "../../utils/formatMoney";

export default function BudgetRow({ item }) {
  const style = CATEGORY_STYLES[item.name] ?? CATEGORY_STYLES.Other;
  const Icon = style.icon;
  const status = budgetStatus(item.amount, item.limit);

  return (
    <li className="rounded-xl bg-blue-50/50 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.chip}`}
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1 basis-48">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-slate-600">{item.note}</p>
        </div>

        <div className="flex items-center gap-6 text-right text-sm">
          <div>
            <p className="text-xs text-slate-600">Spent</p>
            <p className="font-semibold">{money(item.amount)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Limit</p>
            <p>{money(item.limit)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Left</p>
            <p className={`font-semibold ${status.left}`}>
              {money(item.limit - item.amount)}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${status.chip}`}
          >
            {status.percent.toFixed(1)}% used
          </span>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-blue-100">
        <div
          className={`h-full rounded-full ${status.bar}`}
          style={{ width: `${Math.min(status.percent, 100)}%` }}
        />
      </div>
    </li>
  );
}
