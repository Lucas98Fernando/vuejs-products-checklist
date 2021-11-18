export const setLocalToken = (token: string): void =>
  localStorage.setItem("token", token);

export const getLocalToken = (): string | null => localStorage.getItem("token");

export const removeLocalToken = (): void => localStorage.removeItem("token");
