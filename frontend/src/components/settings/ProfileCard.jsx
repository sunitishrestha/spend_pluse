import { useEffect, useRef, useState } from "react";
import {
  Contact,
  User,
  Mail,
  Phone,
  Banknote,
  Check,
  CheckCircle2,
} from "lucide-react";
import FilledField from "./FilledField";
import { CURRENCIES } from "../../constants/currencies";
import { validateName, validateEmail } from "../../utils/validators";

const INITIAL = {
  fullName: "Alex Rivera",
  email: "alex@spendpulse.io",
  phone: "+1 (555) 234-8910",
  currency: "USD",
};

const initialsOf = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

export default function ProfileCard() {
  const [saved, setSaved] = useState(INITIAL);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const fileInput = useRef(null);

  // Free the memory of the previous preview image when it changes
  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const dirty = Object.keys(saved).some((key) => saved[key] !== form[key]);
  const emailChanged = form.email !== saved.email;

  const setField = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setNotice("");
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // lets you pick the same file again later
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return setPhotoError("Use a JPG, PNG or WEBP image");
    }
    if (file.size > 2 * 1024 * 1024)
      return setPhotoError("Image must be under 2 MB");

    setPhotoError("");
    setPhoto(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateName(form.fullName),
      email: validateEmail(form.email),
      phone:
        form.phone && !/^[+\d][\d\s().-]{6,}$/.test(form.phone)
          ? "Enter a valid phone number"
          : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setSaved(form); // the FastAPI call goes here later
    setNotice("Profile updated");
  };

  const handleCancel = () => {
    setForm(saved);
    setErrors({});
    setNotice("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Contact size={20} />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Personal Profile</h2>
            <p className="text-sm text-slate-700">
              Update your public identity and core ledger parameters.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-800">
          Client ID: SP-90481
        </span>
      </div>

      {/* Photo */}
      <div className="mt-5 flex flex-wrap items-center gap-5 rounded-2xl bg-blue-50/70 p-4">
        {photo ? (
          <img
            src={photo}
            alt="Your profile"
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-2xl font-semibold text-white">
            {initialsOf(form.fullName)}
          </span>
        )}

        <div>
          <p className="text-lg font-semibold">
            {form.fullName || "Your name"}
          </p>
          <p className="text-sm text-slate-700">
            JPG, PNG or WEBP. Recommended size 400×400px.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={() => setPhoto(null)}
              disabled={!photo}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
          {photoError && (
            <p className="mt-2 text-xs text-red-600">{photoError}</p>
          )}
        </div>

        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handlePhoto}
        />
      </div>

      {/* Fields */}
      <form onSubmit={handleSave} noValidate className="mt-6">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <FilledField
            id="fullName"
            label="Full Name"
            icon={User}
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            error={errors.fullName}
          />

          <FilledField
            id="email"
            label="Email Address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            error={errors.email}
            hint={
              emailChanged ? (
                <span className="text-xs font-medium text-amber-700">
                  Unverified until saved
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-800">
                  <CheckCircle2 size={14} /> Verified
                </span>
              )
            }
          />

          <FilledField
            id="phone"
            label="Phone Number"
            icon={Phone}
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            error={errors.phone}
          />

          <FilledField
            id="currency"
            label="Default Ledger Currency"
            icon={Banknote}
            options={CURRENCIES}
            value={form.currency}
            onChange={(e) => setField("currency", e.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
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
            onClick={handleCancel}
            disabled={!dirty}
            className="rounded-lg bg-blue-50 px-5 py-3 text-sm font-medium hover:bg-blue-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!dirty}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Check size={16} /> Save Profile Updates
          </button>
        </div>
      </form>
    </section>
  );
}
