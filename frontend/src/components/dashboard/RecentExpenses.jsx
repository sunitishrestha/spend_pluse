import { Plus, ArrowRight } from "lucide-react";
import ExpenseRow from "./ExpenseRow";

export default function RecentExpenses({ expenses, onDelete }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-600">
            Ledger
          </p>
          <h2 className="font-semibold">Recent Expenses</h2>
        </div>
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            <Plus size={16} /> Add Expense
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:underline">
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-600">
          No expenses yet. Use Quick Add above to log your first one.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-slate-100">
          {expenses.map((e) => (
            <ExpenseRow key={e.id} expense={e} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
