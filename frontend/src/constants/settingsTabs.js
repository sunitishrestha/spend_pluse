import {
  User,
  ShieldCheck,
  SlidersHorizontal,
  Bell,
  Landmark,
} from "lucide-react";

export const TABS = [
  { id: "profile", label: "Profile & Account", icon: User },
  { id: "security", label: "Password & Security", icon: ShieldCheck },
  { id: "ledger", label: "Ledger Preferences", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications & Alerts", icon: Bell },
  { id: "accounts", label: "Connected Accounts", icon: Landmark },
];
