import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/90 px-8 py-4 backdrop-blur">
      <p className="text-sm text-slate-600">
        Personal Wealth <span className="mx-1">/</span>
        <span className="font-medium text-slate-900">Overview</span>
      </p>

      <div className="flex items-center gap-5">
        <div className="hidden w-72 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 md:flex">
          <Search size={16} className="text-slate-500" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            placeholder="Search transactions, tags..."
          />
        </div>

        <button className="relative text-slate-600" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            AR
          </span>
          <div className="hidden text-sm leading-tight sm:block">
            <p className="font-medium">Alex Rivera</p>
            <p className="text-xs text-slate-600">Pro Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
