const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function isValidPassword(password) {
  return PASSWORD_PATTERN.test(password);
}
