import { ArrowRight } from "lucide-react";

export default function Button({ children, arrow = true, ...props }) {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      {...props}
    >
      {children}
      {arrow && <ArrowRight size={18} />}
    </button>
  );
}
