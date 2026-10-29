import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import SocialButtons from "../components/auth/SocialButtons";
import FeatureList from "../components/auth/FeatureList";
import SecurityBadge from "../components/auth/SecurityBadge";
import Divider from "../components/ui/Divider";
import InputField from "../components/ui/InputField";
import PasswordField from "../components/ui/PasswordField";
import PasswordStrengthBar from "../components/ui/PasswordStrengthBar";
import SelectField from "../components/ui/SelectField";
import Checkbox from "../components/ui/Checkbox";
import Button from "../components/ui/Button";
import { CURRENCIES } from "../constants/currencies";
import {
  getPasswordStrength,
  STRENGTH_LABELS,
} from "../utils/passwordStrength";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validators";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    currency: "USD",
    agree: true,
  });
  const [errors, setErrors] = useState({});
  const score = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    setForm(updatedForm);

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "password" || name === "confirmPassword"
        ? {
            confirmPassword:
              updatedForm.confirmPassword &&
              updatedForm.password !== updatedForm.confirmPassword
                ? "Passwords do not match"
                : updatedForm.confirmPassword
                  ? ""
                  : "",
          }
        : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateName(form.fullName),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword:
        form.password !== form.confirmPassword ? "password do not match" : "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    console.log("Signup data:", form); // FastAPI call goes here later
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-blue-100/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-800">
            SIMPLE PERSONAL FINANCE
          </span>
        </div>

        <h1 className="text-center text-4xl font-semibold tracking-tight">
          Start tracking with SpendPulse
        </h1>
        <p className="mx-auto mb-6 mt-3 max-w-md text-center text-slate-700">
          Free personal expense tracker with smart receipts &amp; analytics. No
          credit card required.
        </p>

        <SocialButtons />
        <Divider>or create account with email</Divider>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            id="fullName"
            name="fullName"
            label="Full Name"
            icon={User}
            hint={
              <span className="text-xs text-slate-600">
                Personal or business
              </span>
            }
            placeholder="Alex Rivera"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon={Mail}
            placeholder="alex@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            hint={
              form.password && (
                <span className="text-xs font-medium text-emerald-800">
                  {STRENGTH_LABELS[score]}
                </span>
              )
            }
          />

          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <PasswordStrengthBar score={score} />

          <SelectField
            id="currency"
            name="currency"
            label="Primary Ledger Currency"
            hint="Can be changed later"
            options={CURRENCIES}
            value={form.currency}
            onChange={handleChange}
          />

          <FeatureList />

          <Checkbox name="agree" checked={form.agree} onChange={handleChange}>
            I agree to the{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Privacy Policy
            </a>
            , including receipt OCR processing.
          </Checkbox>

          <Button type="submit" disabled={!form.agree}>
            Create Free Account
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </AuthCard>

      <SecurityBadge>
        Your financial data is private and encrypted with AES-256.
      </SecurityBadge>
    </AuthLayout>
  );
}
