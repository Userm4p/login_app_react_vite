import { Route, Routes } from "react-router-dom";
import { PrivateRoutesLayout } from "./components/PrivateRoutesLayout";
import UserProfile from "../../views/UserProfile/UserProfile";

const PrivateRoutes = () => {
  return (
    <PrivateRoutesLayout>
      <Routes>
        <Route path="/*" element={<UserProfile />} />
      </Routes>
    </PrivateRoutesLayout>
  );
};

export default PrivateRoutes;
