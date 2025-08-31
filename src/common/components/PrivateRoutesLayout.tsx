import React from "react";
import Header from "./Header";

interface Props {
  children?: React.ReactNode;
}

export const PrivateRoutesLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
