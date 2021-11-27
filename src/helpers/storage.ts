// Token
export const setLocalToken = (token: string): void =>
  localStorage.setItem("token", token);

export const getLocalToken = (): string | null => localStorage.getItem("token");

export const removeLocalToken = (): void => localStorage.removeItem("token");

// User
export const setLocalUser = (user: string): void =>
  localStorage.setItem("user", user);

export const getLocalUser = (): string | null => localStorage.getItem("user");

export const removeLocalUser = (): void => localStorage.removeItem("user");

// Remove all data
export const removeAllStorageData = (): void => {
  removeLocalToken();
  removeLocalUser();
};
