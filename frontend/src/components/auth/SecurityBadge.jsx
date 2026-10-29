import { ShieldCheck } from "lucide-react";

export default function SecurityBadge({ children }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
      <ShieldCheck size={16} className="shrink-0 text-emerald-700" />
      {children}
    </p>
  );
}
