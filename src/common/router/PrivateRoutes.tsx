import { Route, Routes } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<>Hello world</>} />
    </Routes>
  );
};

export default PrivateRoutes;
