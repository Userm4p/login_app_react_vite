import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginContext from "../context/LoginContext/LoginContext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const Router = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <BrowserRouter>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};

export default Router;
