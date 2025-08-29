import React, { Suspense } from "react";
import "../../i18n";
import { LoginContextProvider } from "../context/LoginContext/LoginContextProvider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Suspense fallback={<div>. . .</div>}>
      <LoginContextProvider>{children}</LoginContextProvider>
    </Suspense>
  );
};

export default Layout;
