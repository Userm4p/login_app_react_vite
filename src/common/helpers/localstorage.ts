import type { User } from "../types/UserResponse";

export const setLoginInfoInLocalStorage = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("access_token", token);
};

export const removeLoginInfoInLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
};
