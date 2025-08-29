import { useCallback, useEffect, useState } from "react";
import type { ILoginContext } from "./LoginContext";
import type { User } from "../../types/UserResponse";

export const useLoginContext = (): ILoginContext => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setLoginInfoInLocalStorage = useCallback(
    (user: User, token: string) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", token);
    },
    [],
  );

  const removeLoginInfoInLocalStorage = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    removeLoginInfoInLocalStorage();
  }, [removeLoginInfoInLocalStorage]);

  const getLoginInfoFromLocalStorage = useCallback(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (!userString || !token) {
      logout();
      return;
    }

    setUser(JSON.parse(userString));
    setToken(token);
    setIsLoggedIn(true);
  }, [logout]);

  const login = useCallback(
    (user: User, token: string) => {
      setIsLoggedIn(true);
      setUser(user);
      setToken(token);
      setLoginInfoInLocalStorage(user, token);
    },
    [setLoginInfoInLocalStorage],
  );

  useEffect(() => {
    getLoginInfoFromLocalStorage();
    /* eslint-disable */
  }, []);

  return {
    isLoggedIn,
    user,
    token,
    login,
    logout,
  };
};
