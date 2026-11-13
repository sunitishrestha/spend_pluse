import { TABS } from "../../constants/settingsTabs";

export default function SettingsTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3"
    >
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            active === id
              ? "bg-blue-50 text-blue-700"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Icon size={18} /> {label}
        </button>
      ))}
    </div>
  );
}
