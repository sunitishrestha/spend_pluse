import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Download,
  FileText,
  PlusCircle,
  ChevronRight,
  Trash2,
} from "lucide-react";
import FilterBar from "../components/expenses/FilterBar";
import ExpensesTable from "../components/expenses/ExpensesTable";
import Pagination from "../components/expenses/Pagination";
import ReceiptPromo from "../components/expenses/ReceiptPromo";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import { allExpenses, EXPENSE_CATEGORIES } from "../data/expensesData";
import { exportCsv } from "../utils/exportCsv";

const SORTERS = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  highest: (a, b) => b.amount - a.amount,
  lowest: (a, b) => a.amount - b.amount,
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(allExpenses);
  const [filters, setFilters] = useState({
    search: "",
    source: "all",
    category: "All",
    sort: "newest",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  // The popup is open when the URL is /expenses?add=1
  const [searchParams, setSearchParams] = useSearchParams();
  const showAdd = searchParams.get("add") === "1";
  const openAdd = () => setSearchParams({ add: "1" });
  const closeAdd = () => setSearchParams({});

  const changeFilter = (patch) => {
    setFilters({ ...filters, ...patch });
    setPage(1);
  };

  const counts = Object.fromEntries(
    EXPENSE_CATEGORIES.map((c) => [
      c,
      expenses.filter((e) => e.category === c).length,
    ]),
  );
  counts.All = expenses.length;

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return expenses
      .filter(
        (e) => filters.category === "All" || e.category === filters.category,
      )
      .filter((e) => filters.source === "all" || e.source === filters.source)
      .filter((e) => !q || `${e.title} ${e.note}`.toLowerCase().includes(q))
      .sort(SORTERS[filters.sort]);
  }, [expenses, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * perPage;
  const rows = filtered.slice(start, start + perPage);

  const toggle = (id) =>
    setSelected(
      selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id],
    );

  const toggleAll = () => {
    const ids = rows.map((r) => r.id);
    const allChosen = ids.every((id) => selected.includes(id));
    setSelected(
      allChosen
        ? selected.filter((id) => !ids.includes(id))
        : [...new Set([...selected, ...ids])],
    );
  };

  const remove = (ids) => {
    setExpenses(expenses.filter((e) => !ids.includes(e.id)));
    setSelected(selected.filter((id) => !ids.includes(id)));
  };

  // keepOpen = true is used by the "Save & Add Another" button
  const addExpense = (data, keepOpen = false) => {
    const time = new Date().toTimeString().slice(0, 5);

    const newExpense = {
      id: Date.now(),
      date: `${data.date}T${time}`,
      title: data.title,
      note: data.note || "No notes added",
      category: data.category,
      payment: data.payment,
      source: data.hasReceipt ? "receipt" : "manual",
      amount: data.amount,
    };

    setExpenses([newExpense, ...expenses]);
    setFilters({ search: "", source: "all", category: "All", sort: "newest" });
    setPage(1);
    if (!keepOpen) closeAdd();
  };

  return (
    <div>
      <p className="mb-2 flex items-center gap-1 text-xs font-medium tracking-wider text-slate-600">
        PERSONAL WEALTH <ChevronRight size={12} />
        <span className="text-blue-700">EXPENSES &amp; RECEIPTS</span>
      </p>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">
              Expenses &amp; Receipts
            </h1>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
              Live Sync
            </span>
          </div>
          <p className="mt-2 text-slate-700">
            Track all your personal spending, filter by category or date, and
            manage verified receipts with automatic line-item parsing.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <div className="flex gap-3">
            <button
              onClick={() => exportCsv(filtered)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium shadow-sm"
            >
              <Download size={16} /> Export CSV
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium shadow-sm">
              <FileText size={16} /> Download Summary
            </button>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <PlusCircle size={16} /> Add New Expense
          </button>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onChange={changeFilter}
        counts={counts}
        categories={EXPENSE_CATEGORIES}
      />

      {selected.length > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-blue-50 px-5 py-3 text-sm">
          <span>
            <b>{selected.length}</b> selected
          </span>
          <button
            onClick={() => remove(selected)}
            className="flex items-center gap-2 font-medium text-red-600 hover:underline"
          >
            <Trash2 size={15} /> Delete selected
          </button>
        </div>
      )}

      <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/70">
        <ExpensesTable
          rows={rows}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          onDelete={remove}
        />
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          perPage={perPage}
          from={filtered.length ? start + 1 : 0}
          to={start + rows.length}
          total={filtered.length}
          onPage={setPage}
          onPerPage={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </section>

      <div className="mt-6">
        <ReceiptPromo />
      </div>

      {showAdd && <AddExpenseModal onClose={closeAdd} onSave={addExpense} />}
    </div>
  );
}
