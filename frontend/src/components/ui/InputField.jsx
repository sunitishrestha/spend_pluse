export default function InputField({
  label,
  hint,
  icon: Icon,
  error,
  rightSlot,
  id,
  ...props
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint}
      </div>

      <div
        className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:ring-red-100"
            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-100"
        }`}
      >
        {Icon && <Icon size={18} className="shrink-0 text-slate-500" />}
        <input
          id={id}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
          {...props}
        />
        {rightSlot}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
