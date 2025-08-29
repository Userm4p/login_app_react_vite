import LoginContext from "./LoginContext";
import { useLoginContext } from "./useLoginContext";

interface Props {
  children: React.ReactNode;
}

export const LoginContextProvider = ({ children }: Props) => {
  const instance = useLoginContext();

  return (
    <LoginContext.Provider value={instance}>{children}</LoginContext.Provider>
  );
};
