export default function StatCard({
  title,
  icon: Icon,
  iconClass = "bg-blue-100 text-blue-700",
  badge,
  children,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <h3 className="max-w-[10rem] text-sm font-medium uppercase tracking-wider text-slate-600">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {badge}
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}
          >
            <Icon size={18} />
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
