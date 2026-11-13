import { Search, Calendar, ChevronDown, ArrowUpDown } from "lucide-react";

const SOURCES = [
  { value: "all", label: "All Entries" },
  { value: "receipt", label: "Receipts Only" },
  { value: "manual", label: "Manual Only" },
];

const SORTS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
];

export default function FilterBar({ filters, onChange, counts, categories }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
          <Search size={16} className="shrink-0 text-slate-500" />
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search merchant, description, tags..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-blue-50/70 px-4 py-3 text-sm"
        >
          <Calendar size={16} className="text-blue-700" />
          This Month (October 2024)
          <ChevronDown size={14} />
        </button>

        <div className="flex rounded-xl bg-blue-50/70 p-1 text-xs font-medium">
          {SOURCES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange({ source: s.value })}
              className={`rounded-lg px-3 py-2 ${
                filters.source === s.value
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative flex items-center rounded-xl bg-blue-50/70 px-4 py-3 text-sm">
          <ArrowUpDown size={16} className="mr-2 shrink-0" />
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="appearance-none bg-transparent pr-6 outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange({ category: c })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              filters.category === c
                ? "bg-blue-700 text-white"
                : "bg-blue-50/70 text-slate-700 hover:bg-blue-100"
            }`}
          >
            {c} ({counts[c]})
          </button>
        ))}
      </div>
    </section>
  );
}
