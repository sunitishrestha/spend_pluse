import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../layouts/DashboardLayout";

import AnalyticsPage from "../pages/AnalyticsPage";
import ExpensesPage from "../pages/ExpensesPage";

import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
