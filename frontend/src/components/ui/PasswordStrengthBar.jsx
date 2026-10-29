export default function PasswordStrengthBar({ score }) {
  return (
    <div className="-mt-3 mb-5 flex gap-2">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className={`h-1.5 flex-1 rounded-full ${n <= score ? "bg-emerald-700" : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
}
