export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

export function isValidText(input: string) {
  return input.trim().length !== 0;
}

export function isValidPhoneNumber(input: string) {
  return !isValidText(input) ? false : /^09[0-9]{8}$/.test(input);
}
