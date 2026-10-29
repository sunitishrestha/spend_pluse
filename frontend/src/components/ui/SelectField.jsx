import { ChevronDown, Banknote } from "lucide-react";

export default function SelectField({ label, hint, options, id, ...props }) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && <span className="text-xs text-slate-600">{hint}</span>}
      </div>

      <div className="relative flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <Banknote size={18} className="mr-3 text-slate-500" />
        <select
          id={id}
          className="w-full appearance-none bg-transparent outline-none"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 text-slate-500"
        />
      </div>
    </div>
  );
}
