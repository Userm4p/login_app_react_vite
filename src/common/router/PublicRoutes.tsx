import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../../views/Login/Login"));

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;
