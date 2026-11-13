import { ChevronDown } from "lucide-react";

export default function FilledField({
  id,
  label,
  hint,
  icon: Icon,
  error,
  rightSlot,
  options,
  className = "",
  ...props
}) {
  const box = error
    ? "bg-red-50 ring-2 ring-red-300"
    : "bg-blue-50/70 focus-within:ring-2 focus-within:ring-blue-300";

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint}
      </div>

      <div
        className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 ${box}`}
      >
        {Icon && <Icon size={18} className="shrink-0 text-slate-700" />}

        {options ? (
          <>
            <select
              id={id}
              className="w-full appearance-none bg-transparent pr-6 outline-none"
              {...props}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 text-slate-700"
            />
          </>
        ) : (
          <input
            id={id}
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
            {...props}
          />
        )}

        {rightSlot}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
