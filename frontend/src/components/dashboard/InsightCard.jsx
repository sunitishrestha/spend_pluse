import { Lightbulb, BadgeCheck } from "lucide-react";

export default function InsightCard() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
          <Lightbulb size={13} />
        </span>
        SMART PULSE INSIGHT
      </p>

      <h2 className="mt-3 text-lg font-semibold">Healthy Monthly Trajectory</h2>
      <p className="mt-2 text-slate-700">
        At your current spending rate of <b>$79.80/day</b>, you will finish
        October with approximately <b>$180 surplus</b>.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <BadgeCheck size={22} className="text-emerald-700" />
          <div>
            <p className="text-sm font-medium">Zero Unreconciled Items</p>
            <p className="text-xs text-slate-600">Receipts matched cleanly</p>
          </div>
        </div>
        <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          Audit
        </button>
      </div>
    </section>
  );
}
