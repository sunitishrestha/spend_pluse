import Logo from "../common/Logo";
import AuthFooter from "./AuthFooter";

export default function AuthLayout({ children, centered = false }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="flex justify-center pt-10">
        <Logo />
      </header>

      <main
        className={`flex flex-1 flex-col items-center px-4 py-8 ${centered ? "justify-center" : ""}`}
      >
        {children}
      </main>

      <AuthFooter />
    </div>
  );
}
