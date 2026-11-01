export default function MetricCard({
  label,
  icon: Icon,
  value,
  valueClass = "",
  unit,
  sub,
  badge,
  circle = "bg-blue-50",
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
          {label}
        </p>
        {badge ? (
          badge
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Icon size={16} />
          </span>
        )}
      </div>

      <p className={`mt-4 text-3xl font-semibold tracking-tight ${valueClass}`}>
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-slate-600">
            {unit}
          </span>
        )}
      </p>
      <p className="mt-1 text-sm text-slate-600">{sub}</p>

      <span
        className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full ${circle}`}
      />
    </div>
  );
}
