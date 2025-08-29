import { createContext } from "react";
import type { User } from "../../types/UserResponse";

export interface ILoginContext {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const LoginContext = createContext<ILoginContext>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default LoginContext;
