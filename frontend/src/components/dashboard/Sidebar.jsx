import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  Wallet,
  SlidersHorizontal,
  Plus,
  CheckCircle2,
} from "lucide-react";
import Logo from "../common/Logo";

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Expenses", to: "/expenses", icon: Receipt },
  { label: "Analytics", to: "/analytics", icon: TrendingUp },
  { label: "Budgets", to: "/budgets", icon: Wallet },
  { label: "Settings", to: "/settings", icon: SlidersHorizontal },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-100 bg-white p-6 lg:flex">
      <Logo />

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
        <Plus size={16} /> Add Expense
      </button>

      <nav className="mt-6 space-y-1">
        {NAV.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-xl bg-blue-50/70 p-3 text-sm">
        <CheckCircle2 size={20} className="text-emerald-700" />
        <div>
          <p className="font-medium">Monthly Target</p>
          <p className="text-xs text-slate-600">68% within limit</p>
        </div>
      </div>
    </aside>
  );
}
