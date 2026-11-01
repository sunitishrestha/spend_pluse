import { Trash2, Receipt, PenLine, FileText } from "lucide-react";
import { CATEGORY_STYLES } from "../../constants/categories";
import { money } from "../../utils/formatMoney";

const SOURCES = {
  receipt: { label: "Receipt", icon: Receipt, cls: "bg-blue-50 text-blue-700" },
  manual: {
    label: "Manual",
    icon: PenLine,
    cls: "bg-slate-100 text-slate-600",
  },
  pdf: { label: "PDF", icon: FileText, cls: "bg-blue-50 text-blue-700" },
};

export default function ExposeRow({ expense, onDelete }) {
  const style = CATEGORY_STYLES[expense.category] ?? CATEGORY_STYLES.Other;
  const source = SOURCES[expense.source];
  const Icon = style.icon;
  const SourceIcon = source.icon;

  return (
    <li className="flex items-center gap-4 py-4">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${style.chip}`}
      >
        <Icon size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{expense.title}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {expense.when}
          <span className={`rounded px-2 py-0.5 ${style.chip}`}>
            {expense.category}
          </span>
        </p>
      </div>

      <span
        className={`hidden items-center gap-1.5 rounded-md px-2.5 py-1 text-xs sm:flex ${source.cls}`}
      >
        <SourceIcon size={12} /> {source.label}
      </span>

      <span className="w-24 text-right font-semibold">
        {money(expense.amount)}
      </span>

      <button
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.title}`}
        className="text-slate-400 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}
