import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  Banknote,
  Wallet,
  Gauge,
} from "lucide-react";
import MetricCard from "../components/analytics/MetricCard";
import CategoryDonut from "../components/analytics/CategoryDonut";
import TrendChart from "../components/analytics/TrendChart";
import BudgetAllocations from "../components/analytics/BudgetAllocations";
import {
  spendByCategory,
  trend,
  monthlyBudget,
  daysUntilReset,
  recommendedPace,
} from "../data/analyticsData";
import { money } from "../utils/formatMoney";

const MONTHS = [
  "January 2024",
  "February 2024",
  "March 2024",
  "April 2024",
  "May 2024",
  "June 2024",
  "July 2024",
  "August 2024",
  "September 2024",
  "October 2024",
  "November 2024",
  "December 2024",
];

export default function AnalyticsPage() {
  const [monthIndex, setMonthIndex] = useState(9);

  const outflow = spendByCategory.reduce((sum, c) => sum + c.amount, 0);
  const remaining = monthlyBudget - outflow;
  const usedPercent = ((outflow / monthlyBudget) * 100).toFixed(1);
  const dailyAverage = outflow / 31;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">
            FISCAL INTELLIGENCE ·{" "}
            <span className="text-emerald-800">Q4 ACTIVE CYCLE</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Analytics &amp; Budgets
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm">
            <button
              onClick={() => setMonthIndex(Math.max(0, monthIndex - 1))}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="flex items-center gap-2 text-sm font-medium">
              <Calendar size={16} className="text-blue-700" />{" "}
              {MONTHS[monthIndex]}
            </span>
            <button
              onClick={() =>
                setMonthIndex(Math.min(MONTHS.length - 1, monthIndex + 1))
              }
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium shadow-sm">
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total outflow"
          icon={Banknote}
          value={money(outflow)}
          sub={`${usedPercent}% of planned envelope`}
        />
        <MetricCard
          label="Monthly budget"
          icon={Wallet}
          value={money(monthlyBudget)}
          sub={`Cap resets in ${daysUntilReset} days`}
        />
        <MetricCard
          label="Net remaining"
          icon={Wallet}
          value={money(remaining)}
          valueClass="text-emerald-800"
          sub="Surplus unallocated"
          circle="bg-emerald-50"
          badge={
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              On Track
            </span>
          }
        />
        <MetricCard
          label="Average daily spend"
          icon={Gauge}
          value={money(dailyAverage)}
          unit="/ day"
          sub={`Recommended pacing: ${money(recommendedPace)}`}
          circle="bg-amber-50"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <CategoryDonut items={spendByCategory} />
        </div>
        <div className="lg:col-span-3">
          <TrendChart data={trend} target={monthlyBudget} />
        </div>
      </div>

      <div className="mt-6">
        <BudgetAllocations items={spendByCategory} />
      </div>
    </div>
  );
}
