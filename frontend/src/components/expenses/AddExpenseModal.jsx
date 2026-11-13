import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  CheckCircle2,
  Plus,
  Utensils,
  Car,
  ShoppingBag,
  Clapperboard,
  Zap,
  MoreHorizontal,
  Store,
  Calendar,
  UploadCloud,
  FileText,
  Trash2,
} from "lucide-react";

const CATEGORIES = [
  { name: "Food & Dining", icon: Utensils },
  { name: "Transport", icon: Car },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Entertainment", icon: Clapperboard },
  { name: "Utilities", icon: Zap },
  { name: "Other", icon: MoreHorizontal },
];

const ACCOUNTS = [
  { label: "Personal Checking", value: "Cash / Checking" },
  { label: "Chase Sapphire", value: "Chase Sapphire •• 4912" },
  { label: "Apple Pay", value: "Apple Pay •• 8820" },
];

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
];

const MAX_FILE_MB = 5;
const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-slate-700";

const fieldBox = (hasError) =>
  `flex items-center gap-3 rounded-lg px-4 py-3.5 focus-within:ring-2 ${
    hasError
      ? "bg-red-50 ring-2 ring-red-300"
      : "bg-blue-50/70 focus-within:ring-blue-300"
  }`;

export default function AddExpenseModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    amount: "",
    currency: "USD",
    payment: ACCOUNTS[0].value,
    category: "Food & Dining",
    title: "",
    date: today(),
    note: "",
  });
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);
  const amountInput = useRef(null);

  const symbol = CURRENCIES.find((c) => c.code === form.currency).symbol;

  // Close with Escape, and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const setField = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const pickFile = (picked) => {
    if (!picked) return;
    const validType =
      picked.type.startsWith("image/") || picked.type === "application/pdf";

    if (!validType)
      return setErrors({ ...errors, file: "Upload an image or a PDF" });
    if (picked.size > MAX_FILE_MB * 1024 * 1024) {
      return setErrors({
        ...errors,
        file: `File must be under ${MAX_FILE_MB} MB`,
      });
    }
    setFile(picked);
    setErrors({ ...errors, file: "" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  };

  // keepOpen = true is the "Save & Add Another" button
  const save = (keepOpen) => {
    const newErrors = {};
    if (!(Number(form.amount) > 0))
      newErrors.amount = "Enter an amount greater than 0";
    if (!form.title.trim()) newErrors.title = "Add a merchant or description";
    if (!form.date) newErrors.date = "Choose a date";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave(
      {
        amount: Number(form.amount),
        currency: form.currency,
        payment: form.payment,
        category: form.category,
        title: form.title.trim(),
        date: form.date,
        note: form.note.trim(),
        hasReceipt: Boolean(file),
      },
      keepOpen,
    );

    if (keepOpen) {
      setForm({ ...form, amount: "", title: "", note: "" });
      setFile(null);
      setErrors({});
      amountInput.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-expense-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94vh] w-full max-w-[840px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="overflow-y-auto px-8 pb-6 pt-7 sm:px-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2
                  id="add-expense-title"
                  className="text-2xl font-semibold tracking-tight"
                >
                  Add New Expense
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Quick Log
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Enter your expense details below. Uploading a receipt is
                completely optional.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-slate-600 hover:text-slate-900"
            >
              <X size={22} />
            </button>
          </div>

          {/* Amount card */}
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="amount"
                className="text-xs font-medium uppercase tracking-wider text-slate-700"
              >
                Amount
              </label>

              <div className="flex items-center gap-2 text-xs font-medium">
                <label className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-700" />
                  <select
                    aria-label="Account"
                    value={form.payment}
                    onChange={(e) => setField("payment", e.target.value)}
                    className="appearance-none bg-transparent outline-none"
                  >
                    {ACCOUNTS.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </label>

                <select
                  aria-label="Currency"
                  value={form.currency}
                  onChange={(e) => setField("currency", e.target.value)}
                  className="rounded-full bg-white px-3 py-1.5 shadow-sm outline-none"
                >
                  {CURRENCIES.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                    >{`${c.code} (${c.symbol})`}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1">
              <span className="text-5xl font-semibold text-blue-700">
                {symbol}
              </span>
              <input
                ref={amountInput}
                id="amount"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                autoFocus
                value={form.amount}
                onChange={(e) => setField("amount", e.target.value)}
                className="w-full bg-transparent text-5xl font-semibold tracking-tight outline-none placeholder:text-slate-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            {errors.amount && (
              <p className="mt-2 text-xs text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <p className={`${labelClass} mt-6`}>Category</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map(({ name, icon: Icon }) => {
              const active = form.category === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setField("category", name)}
                  aria-pressed={active}
                  className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50/70 text-slate-800 hover:bg-blue-100"
                  }`}
                >
                  <Icon size={16} /> {name}
                </button>
              );
            })}
          </div>

          {/* Merchant + date */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className={labelClass}>
                Description / Merchant
              </label>
              <div className={fieldBox(errors.title)}>
                <Store size={18} className="shrink-0 text-slate-700" />
                <input
                  id="title"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Tartine Bakery"
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className={labelClass}>
                Date
              </label>
              <div className={fieldBox(errors.date)}>
                <Calendar size={18} className="shrink-0 text-slate-700" />
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label htmlFor="note" className={labelClass}>
                Notes
              </label>
              <span className="mb-2 text-xs text-slate-700">Optional</span>
            </div>
            <textarea
              id="note"
              rows={2}
              value={form.note}
              onChange={(e) => setField("note", e.target.value)}
              placeholder="Team breakfast pastries and coffee"
              className="w-full resize-none rounded-lg bg-blue-50/70 px-4 py-3.5 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Receipt proof */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-700">
                Receipt Proof
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-normal normal-case tracking-normal text-slate-700">
                  Optional
                </span>
              </p>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                <CheckCircle2 size={14} /> Manual entry fully enabled
              </span>
            </div>

            {file ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-blue-50/70 px-5 py-5">
                <span className="flex min-w-0 items-center gap-3 text-sm">
                  <FileText size={20} className="shrink-0 text-blue-700" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="shrink-0 text-xs text-slate-700">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  aria-label="Remove receipt"
                  className="text-slate-600 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center rounded-2xl border-2 px-6 py-8 text-center transition ${
                  dragging
                    ? "border-dashed border-blue-500 bg-blue-50"
                    : "border-transparent bg-blue-50/70"
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                  <UploadCloud size={20} />
                </span>
                <p className="mt-3 text-sm font-medium">
                  Drop receipt image or PDF here{" "}
                  <span className="font-normal">(Optional)</span>, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInput.current.click()}
                    className="text-blue-700 hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Skip if you don't have a receipt — manual entries are fully
                  supported.
                </p>
              </div>
            )}

            <input
              ref={fileInput}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => pickFile(e.target.files[0])}
            />
            {errors.file && (
              <p className="mt-2 text-xs text-red-600">{errors.file}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-8 py-4 sm:px-10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-800 hover:underline"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => save(true)}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-slate-100"
            >
              <Plus size={14} /> Save &amp; Add Another
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
            >
              <Check size={16} /> Save Expense
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
}
