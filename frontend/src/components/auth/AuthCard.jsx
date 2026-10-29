export default function AuthCard({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-[540px] rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/60 ${className}`}
    >
      {children}
    </div>
  );
}
