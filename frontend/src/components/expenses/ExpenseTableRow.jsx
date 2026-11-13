import {
  Trash2,
  CheckCircle2,
  PenLine,
  Smartphone,
  CreditCard,
  Landmark,
} from "lucide-react";
import { CATEGORY_STYLES } from "../../constants/categories";
import { formatDate, formatTime } from "../../utils/formatDate";
import { money } from "../../utils/formatMoney";

function PaymentIcon({ payment }) {
  if (payment.includes("Apple")) return <Smartphone size={14} />;
  if (payment.includes("Chase")) return <CreditCard size={14} />;
  return <Landmark size={14} />;
}

export default function ExpenseTableRow({
  expense,
  selected,
  onToggle,
  onDelete,
}) {
  const style = CATEGORY_STYLES[expense.category] ?? CATEGORY_STYLES.Other;
  const Icon = style.icon;

  return (
    <tr
      className={`border-t border-slate-100 ${selected ? "bg-blue-50/50" : ""}`}
    >
      <td className="py-4 pl-6 pr-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(expense.id)}
          aria-label={`Select ${expense.title}`}
          className="h-4 w-4 accent-blue-600"
        />
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <p className="font-medium">{formatDate(expense.date)}</p>
        <p className="text-xs text-slate-600">{formatTime(expense.date)}</p>
      </td>

      <td className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.chip}`}
          >
            <Icon size={18} />
          </span>
          <div className="min-w-0">
            <p className="font-medium">{expense.title}</p>
            <p className="max-w-xs truncate text-sm text-slate-600">
              {expense.note}
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 py-4">
        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${style.chip}`}
        >
          {expense.category}
        </span>
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <span className="flex items-center gap-2 text-slate-700">
          <PaymentIcon payment={expense.payment} /> {expense.payment}
        </span>
      </td>

      <td className="px-3 py-4">
        {expense.source === "receipt" ? (
          <span className="flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
            <CheckCircle2 size={13} /> Receipt Attached
          </span>
        ) : (
          <span className="flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            <PenLine size={13} /> Manual Entry
          </span>
        )}
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-right font-semibold">
        {money(expense.amount)}
      </td>

      <td className="py-4 pl-3 pr-6">
        <button
          onClick={() => onDelete([expense.id])}
          aria-label={`Delete ${expense.title}`}
          className="text-slate-400 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
