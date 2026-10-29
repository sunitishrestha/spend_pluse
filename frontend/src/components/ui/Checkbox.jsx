export default function Checkbox({ children, ...props }) {
  return (
    <label className="mb-5 flex cursor-pointer items-start gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}
