import { SlidersHorizontal } from "lucide-react";
import BudgetRow from "./BudgetRow";

export default function BudgetAllocations({ items }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">
            Monthly Budget Allocations &amp; Progress
          </h2>
          <p className="text-sm text-slate-600">
            Real-time status per category envelope for active billing cycle
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium">
          <SlidersHorizontal size={16} /> Edit Budgets
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <BudgetRow key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}
