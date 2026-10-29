export const validateName = (value) =>
  value.trim().length < 2 ? "Enter your full name" : "";

export const validateEmail = (value) => {
  if (!value.trim()) return "Email is required";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? ""
    : "Enter a valid email address";
};

export const validatePassword = (value) =>
  value.length < 8 ? "Password must be at least 8 characters" : "";
