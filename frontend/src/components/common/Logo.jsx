import { Wallet } from "lucide-react";

export default function Logo({ size = "md", showName = true }) {
  const box =
    size === "lg" ? "h-[60px] w-[60px] rounded-2xl" : "h-11 w-11 rounded-xl";
  const icon = size === "lg" ? 28 : 22;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center bg-blue-600 text-white ${box}`}
      >
        <Wallet size={icon} />
      </div>
      {showName && (
        <span className="text-2xl font-medium tracking-tight">SpendPulse</span>
      )}
    </div>
  );
}
