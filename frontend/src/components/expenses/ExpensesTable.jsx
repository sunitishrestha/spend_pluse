import ExpenseTableRow from "./ExpenseTableRow";

const HEADINGS = ["Date", "Merchant", "Category", "Payment Method", "Source"];

export default function ExpensesTable({
  rows,
  selected,
  onToggle,
  onToggleAll,
  onDelete,
}) {
  const allSelected =
    rows.length > 0 && rows.every((r) => selected.includes(r.id));

  if (rows.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-slate-600">
        No expenses match these filters. Try clearing the search or choosing
        another category.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] text-left">
        <thead className="bg-blue-50/60 text-xs font-medium uppercase tracking-wider text-slate-600">
          <tr>
            <th className="py-3 pl-6 pr-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Select all on this page"
                className="h-4 w-4 accent-blue-600"
              />
            </th>
            {HEADINGS.map((h) => (
              <th key={h} className="px-3 py-3">
                {h}
              </th>
            ))}
            <th className="px-3 py-3 text-right">Amount</th>
            <th className="py-3 pl-3 pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((expense) => (
            <ExpenseTableRow
              key={expense.id}
              expense={expense}
              selected={selected.includes(expense.id)}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
