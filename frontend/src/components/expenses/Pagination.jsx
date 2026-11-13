import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  pageCount,
  perPage,
  from,
  to,
  total,
  onPage,
  onPerPage,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 text-sm text-slate-700">
      <div className="flex items-center gap-3">
        <span>
          Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> entries
        </span>
        <label className="flex items-center gap-2">
          Show
          <select
            value={perPage}
            onChange={(e) => onPerPage(Number(e.target.value))}
            className="rounded-lg bg-blue-50/70 px-2 py-1 outline-none"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          per page
        </label>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="rounded-lg p-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={`h-9 w-9 rounded-lg text-sm font-medium ${
              n === page ? "bg-blue-700 text-white" : "hover:bg-slate-100"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onPage(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
          className="rounded-lg p-2 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
