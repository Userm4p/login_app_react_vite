import React from "react";
import Header from "../../components/Header";

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
