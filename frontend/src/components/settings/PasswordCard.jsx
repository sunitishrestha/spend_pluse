import { useState } from "react";
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Mail,
  Send,
  History,
  ArrowRight,
} from "lucide-react";
import FilledField from "./FilledField";
import { getPasswordStrength } from "../../utils/passwordStrength";

const REQUIREMENTS = [
  { label: "Min 8 characters", test: (p) => p.length >= 8 },
  { label: "1+ numerical digit", test: (p) => /\d/.test(p) },
  { label: "1+ special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const LEVELS = [
  "Not set",
  "Weak password",
  "Fair password",
  "Good password",
  "Strong password",
];
const BAR_COLORS = [
  "bg-slate-200",
  "bg-red-600",
  "bg-amber-600",
  "bg-emerald-600",
  "bg-emerald-800",
];
const TEXT_COLORS = [
  "text-slate-600",
  "text-red-700",
  "text-amber-700",
  "text-emerald-800",
  "text-emerald-800",
];

const EMPTY = { current: "", next: "", confirm: "" };
const RECOVERY_EMAIL = "alex@spendpulse.io";

// A password field with its own show / hide eye button
function SecretField({ ...props }) {
  const [show, setShow] = useState(false);

  return (
    <FilledField
      type={show ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="shrink-0 text-slate-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
}

export default function PasswordCard() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [updatedLabel, setUpdatedLabel] = useState("Updated 45d ago");

  const score = getPasswordStrength(form.next);

  const setField = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setNotice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.current) newErrors.current = "Enter your current password";
    if (!REQUIREMENTS.every((r) => r.test(form.next))) {
      newErrors.next =
        "Use 8+ characters with a number and a special character";
    } else if (form.next === form.current) {
      newErrors.next = "New password must be different from the current one";
    }
    if (form.confirm !== form.next)
      newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setForm(EMPTY); // the FastAPI call goes here later
    setUpdatedLabel("Updated just now");
    setNotice("Password updated");
  };

  const handleDiscard = () => {
    setForm(EMPTY);
    setErrors({});
    setNotice("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <KeyRound size={20} />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Password Management</h2>
            <p className="text-sm text-slate-700">
              Update your password or initiate a secure recovery if forgotten.
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-slate-800">
          <History size={14} /> {updatedLabel}
        </span>
      </div>

      {/* Recovery banner */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50/70 p-4">
        <div className="flex min-w-0 flex-1 basis-72 items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
            <Mail size={20} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-semibold">
                Forgot or lost your current password?
              </h3>
              <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                Recovery Ready
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-700">
              {resetSent
                ? `A one-click reset link was sent to ${RECOVERY_EMAIL}. Check your inbox.`
                : `Cannot recall your current password? We can send a secure, one-click reset link to your registered recovery email (${RECOVERY_EMAIL}).`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setResetSent(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50"
        >
          <Send size={16} />{" "}
          {resetSent ? "Send Again" : "Send Password Reset Email"}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <SecretField
          id="current"
          label="Current Password"
          icon={Lock}
          autoComplete="current-password"
          value={form.current}
          onChange={(e) => setField("current", e.target.value)}
          error={errors.current}
          hint={
            <button
              type="button"
              onClick={() => setResetSent(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:underline"
            >
              Forgot your current password? <ArrowRight size={14} />
            </button>
          }
        />

        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <SecretField
            id="next"
            label="New Password"
            icon={KeyRound}
            autoComplete="new-password"
            value={form.next}
            onChange={(e) => setField("next", e.target.value)}
            error={errors.next}
          />
          <SecretField
            id="confirm"
            label="Confirm New Password"
            icon={CheckCircle2}
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => setField("confirm", e.target.value)}
            error={errors.confirm}
          />
        </div>

        {/* Strength */}
        <div className="rounded-2xl bg-blue-50/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Password Strength Assessment</p>
            <p
              className={`flex items-center gap-1.5 text-xs font-semibold ${TEXT_COLORS[score]}`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />{" "}
              {LEVELS[score]}
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full ${n <= score ? BAR_COLORS[score] : "bg-slate-200"}`}
              />
            ))}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {REQUIREMENTS.map((r) => {
              const met = r.test(form.next);
              return (
                <li
                  key={r.label}
                  className={`flex items-center gap-2 ${met ? "text-emerald-800" : "text-slate-600"}`}
                >
                  <CheckCircle2 size={16} /> {r.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {notice && (
            <p
              role="status"
              className="mr-auto flex items-center gap-1.5 text-sm font-medium text-emerald-800"
            >
              <CheckCircle2 size={16} /> {notice}
            </p>
          )}
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-lg bg-blue-50 px-5 py-3 text-sm font-medium hover:bg-blue-100"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <History size={16} /> Update Password
          </button>
        </div>
      </form>
    </section>
  );
}
