import { useState } from "react";
import { ChevronRight } from "lucide-react";
import SettingsTabs from "../components/settings/SettingsTabs";
import { TABS } from "../constants/settingsTabs";
import ProfileCard from "../components/settings/ProfileCard";
import PasswordCard from "../components/settings/PasswordCard";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const current = TABS.find((t) => t.id === tab);

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm text-slate-700">
        Personal Wealth <ChevronRight size={14} />
        <span className="font-medium text-blue-700">Account Settings</span>
      </p>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            Settings &amp; Security
          </h1>
          <p className="mt-2 text-slate-700">
            Manage your personal profile, update password credentials, configure
            recovery options, and control account security.
          </p>
        </div>

        <span className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-900">
          <span className="h-2 w-2 rounded-full bg-emerald-700" />
          Account Status: Active Pro
        </span>
      </div>

      <SettingsTabs active={tab} onChange={setTab} />

      <div className="mt-6 max-w-3xl space-y-6">
        {tab === "profile" && (
          <>
            <ProfileCard />
            <PasswordCard />
          </>
        )}

        {tab === "security" && <PasswordCard />}

        {tab !== "profile" && tab !== "security" && (
          <section className="rounded-2xl bg-white p-10 text-center shadow-sm shadow-slate-200/70">
            <h2 className="text-lg font-semibold">{current.label}</h2>
            <p className="mt-2 text-sm text-slate-700">
              This section isn't built yet. We'll add it after the main pages
              are done.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
