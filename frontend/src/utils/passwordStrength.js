// Returns a score from 0 to 4
export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export const STRENGTH_LABELS = [
  "Too short",
  "Weak Password",
  "Fair Password",
  "Good Password",
  "Strong Password",
];
