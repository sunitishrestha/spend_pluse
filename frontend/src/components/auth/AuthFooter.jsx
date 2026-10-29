import { Lock } from "lucide-react";

export default function AuthFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 pb-8 text-sm text-slate-700">
      <span className="flex items-center gap-2">
        <Lock size={14} className="text-emerald-700" /> 256-bit Bank Grade
        Encryption
      </span>
      <a href="#" className="hover:underline">
        Privacy Policy
      </a>
      <a href="#" className="hover:underline">
        Terms of Service
      </a>
      <a href="#" className="hover:underline">
        Security Center
      </a>
    </footer>
  );
}
