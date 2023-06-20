import { Route, HashRouter, Routes } from "react-router-dom";

import CatalogPage from "../pages/CatalogPage";

const StoreRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<CatalogPage />} path="/catalog" />
      </Routes>
    </HashRouter>
  );
};

export default StoreRoutes;
