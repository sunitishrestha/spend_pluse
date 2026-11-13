import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  Wallet,
  Settings,
  Plus,
  User,
  ChevronsUpDown,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Expenses", to: "/expenses", icon: Receipt },
  { label: "Analytics", to: "/analytics", icon: TrendingUp },
  { label: "Budgets", to: "/budgets", icon: Wallet },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-white p-4 lg:flex">
      <div className="flex items-center gap-3 px-1 pt-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <TrendingUp size={20} />
        </span>
        <div className="leading-tight">
          <p className="text-lg font-semibold tracking-tight">SpendPulse</p>
          <p className="text-[11px] tracking-wide text-slate-600">
            Personal Finance
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/expenses?add=1")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        <Plus size={16} /> Add Expense
      </button>

      <nav className="mt-6 space-y-1">
        {NAV.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                isActive
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "font-medium text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
          <User size={18} />
        </span>
        <div className="min-w-0 flex-1 text-sm leading-tight">
          <p className="font-medium">Alex Rivera</p>
          <p className="truncate text-xs text-slate-600">alex@spendpulse.io</p>
        </div>
        <ChevronsUpDown size={16} className="shrink-0 text-slate-500" />
      </div>
    </aside>
  );
}
