import { useCallback, useEffect, useState } from "react";
import type { ILoginContext } from "./LoginContext";
import type { User } from "../../types/UserResponse";
import {
  removeLoginInfoInLocalStorage,
  setLoginInfoInLocalStorage,
} from "../../helpers/localstorage";

export const useLoginContext = (): ILoginContext => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    removeLoginInfoInLocalStorage();
  }, []);

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

  const login = useCallback((user: User, token: string) => {
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);
    setLoginInfoInLocalStorage(user, token);
  }, []);

  const refreshUser = useCallback(
    (user: User) => {
      setUser(user);
      setLoginInfoInLocalStorage(user, token!);
    },
    [token],
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
    setUser: refreshUser,
  };
};
