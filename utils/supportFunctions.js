// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const isValid = (label, value, type) => {
  if (!value?.trim()) return `${label} is required.`;
  if (!type) return '';
  if (type === 'email' && !emailRegex.test(value)) return 'Invalid email.';
  if (type === 'password' && !passwordRegex.test(value))
    return 'Password should contain at least one digit, one lowercase letter, one uppercase letter, and be at least 6 characters long.';
  return '';
};
