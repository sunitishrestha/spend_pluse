import { useState } from "react";
import {
  CreditCard,
  PiggyBank,
  Receipt,
  Calendar,
  SlidersHorizontal,
  Share2,
  TrendingDown,
  PenLine,
  ScanLine,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import QuickAddExpense from "../components/dashboard/QuickAddExpense";
import WeeklyActivity from "../components/dashboard/WeeklyActivity";
import CategoryBudgets from "../components/dashboard/CategoryBudgets";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import InsightCard from "../components/dashboard/InsightCard";
import HabitCard from "../components/dashboard/HabitCard";
import { summary, weekly, categories, initialExpenses } from "../data/mockData";
import { splitMoney } from "../utils/formatMoney";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = ({ title, amount }) => {
    const newExpense = {
      id: Date.now(),
      title,
      amount,
      when: "Today",
      category: "Other",
      source: "manual",
    };
    setExpenses([newExpense, ...expenses]); // newest first
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const spent = splitMoney(summary.spent);
  const left = splitMoney(summary.remaining);
  const percentUsed = Math.round((summary.spent / summary.limit) * 100);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-700">
            ● ACTIVE BILLING CYCLE • OCT 1 - OCT 31
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Financial Flow
          </h1>
          <p className="mt-1 text-slate-700">
            Here is your real-time cash outflow and pacing for October.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm">
            <Calendar size={16} /> October 2024
          </button>
          <button
            className="rounded-xl bg-white p-2.5 shadow-sm"
            aria-label="Filters"
          >
            <SlidersHorizontal size={16} />
          </button>
          <button
            className="rounded-xl bg-white p-2.5 shadow-sm"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* 3 stat cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total spent this month" icon={CreditCard}>
          <p className="mt-3 text-5xl font-semibold tracking-tight">
            ${spent.dollars}
            <span className="text-2xl font-normal text-slate-500">
              .{spent.cents}
            </span>
          </p>
          <div className="mt-4 flex justify-between text-xs text-slate-600">
            <span>{percentUsed}% of monthly limit</span>
            <span>${summary.limit.toLocaleString("en-US")}.00</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-700"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
        </StatCard>

        <StatCard
          title="Budget remaining"
          icon={PiggyBank}
          iconClass="bg-emerald-100 text-emerald-700"
          badge={
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              On Track
            </span>
          }
        >
          <p className="mt-3 text-5xl font-semibold tracking-tight text-emerald-800">
            ${left.dollars}
            <span className="text-2xl font-normal">.{left.cents}</span>
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-700">
            <TrendingDown size={16} className="text-emerald-700" />
            Average spend <b>${summary.perDay}/day</b> left for{" "}
            {summary.daysLeft} days
          </p>
        </StatCard>

        <StatCard title="Total logged" icon={Receipt}>
          <p className="mt-3 text-5xl font-semibold tracking-tight">
            {summary.transactions}
            <span className="ml-2 text-base font-normal text-slate-600">
              transactions
            </span>
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-lg bg-blue-50/70 px-3 py-2 text-xs">
            <span className="flex items-center gap-1.5 text-slate-700">
              <PenLine size={14} /> {summary.manual} manual
            </span>
            <span className="flex items-center gap-1.5 font-medium text-blue-700">
              <ScanLine size={14} /> {summary.receipts} with receipts
            </span>
          </div>
        </StatCard>
      </div>

      {/* Main two-column area */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <QuickAddExpense onAdd={addExpense} />
          <WeeklyActivity data={weekly} />
          <RecentExpenses expenses={expenses} onDelete={deleteExpense} />
        </div>

        <div className="space-y-6">
          <CategoryBudgets items={categories} />
          <InsightCard />
          <HabitCard />
        </div>
      </div>
    </div>
  );
}
