import { Check } from "lucide-react";

const FEATURES = [
  "Manual typing or high-speed receipt scanning",
  "Monthly budget caps, predictive category alerts",
  "100% Free personal plan included forever",
];

export default function FeatureList() {
  return (
    <ul className="mb-5 space-y-2.5 rounded-xl bg-blue-50/60 p-4 text-sm">
      {FEATURES.map((f) => (
        <li key={f} className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check size={12} strokeWidth={3} />
          </span>
          {f}
        </li>
      ))}
    </ul>
  );
}
