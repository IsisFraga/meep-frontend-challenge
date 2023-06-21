import { Route, Routes, Navigate } from "react-router-dom";

import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";
import ProductPage from "../pages/ProductPage";

export const FallbackPage = () => {
  return (
    <div className="w-full h-full max-h-60 md:max-h-96 flex justify-center items-center">
      <p className="font-semibold text-xl">404 not found</p>
    </div>
  )
}

const StoreRoutes = () => {
  return (
      <Routes>
        <Route element={<CatalogPage />} path="/catalog" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<ProductPage />} path={`/product/:id`} />
        <Route element={<Navigate to="/catalog"/>} path="/" />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
  );
};

export default StoreRoutes;