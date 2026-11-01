export default function HabitCard() {
  return (
    <section className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br from-amber-100 to-slate-200" />
      <div>
        <p className="text-xs tracking-wide text-slate-600">SPENDPULSE HABIT</p>
        <h3 className="font-semibold">Mindful Friction</h3>
        <p className="mt-1 text-xs text-slate-600">
          Reviewing your totals daily reduces impulsive micro-purchases by 23%.
        </p>
      </div>
    </section>
  );
}
