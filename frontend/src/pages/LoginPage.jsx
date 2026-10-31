import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import SocialButtons from "../components/auth/SocialButtons";
import SecurityBadge from "../components/auth/SecurityBadge";
import Logo from "../components/common/Logo";
import Divider from "../components/ui/Divider";
import InputField from "../components/ui/InputField";
import PasswordField from "../components/ui/PasswordField";
import Checkbox from "../components/ui/Checkbox";
import Button from "../components/ui/Button";
import { validateEmail } from "../utils/validators";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" }); // clear the error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(form.email),
      password: form.password ? "" : "Password is required",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    console.log("Login data:", form); // FastAPI call goes here later

    navigate("/dashboard");
  };

  return (
    <AuthLayout centered>
      <AuthCard className="max-w-[460px]">
        <div className="mb-5 flex justify-center">
          <Logo size="lg" showName={false} />
        </div>

        <h1 className="text-center text-4xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mx-auto mb-6 mt-3 max-w-xs text-center text-slate-700">
          Enter your details to access your expenses and real-time budgets.
        </p>

        <SocialButtons />
        <Divider>OR CONTINUE WITH EMAIL</Divider>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            id="email"
            name="email"
            type="email"
            label="Work or personal email"
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
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            hint={
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot password?
              </a>
            }
          />

          <Checkbox
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          >
            Remember this device for 30 days
          </Checkbox>

          <Button type="submit">Sign In to SpendPulse</Button>
        </form>

        <p className="mt-6 text-center text-slate-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-700 hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </AuthCard>

      <SecurityBadge>
        256-bit Bank-grade encryption • Receipts &amp; telemetry securely stored
        in AWS S3
      </SecurityBadge>
    </AuthLayout>
  );
}
