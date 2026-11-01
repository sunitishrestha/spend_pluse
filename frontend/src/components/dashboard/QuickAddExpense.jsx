import { useState } from "react";
import { Zap, Camera } from "lucide-react";

export default function QuickAddExpense({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) return setError("Enter an amount greater than 0");
    if (!title.trim()) return setError("Add a merchant or description");

    onAdd({ title: title.trim(), amount: value });
    setAmount("");
    setTitle("");
    setError("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Zap size={18} />
          </span>
          <div>
            <h2 className="font-semibold">Quick Add Expense</h2>
            <p className="text-sm text-slate-600">
              Add manually in 3 seconds or drop a receipt photo
            </p>
          </div>
        </div>
        <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 sm:block">
          Receipts optional
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-3">
        <div className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 sm:w-44">
          <span className="text-slate-500">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <input
          placeholder="Merchant or description..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-w-0 flex-1 rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none"
        />

        <button
          type="button"
          aria-label="Scan receipt"
          className="rounded-xl bg-slate-50 p-3 text-slate-600"
        >
          <Camera size={18} />
        </button>
        <button
          type="submit"
          className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Add
        </button>
      </form>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </section>
  );
}
