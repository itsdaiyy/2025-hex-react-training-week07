import { createHashRouter } from "react-router-dom";

import FrontLayout from "../layouts/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import ProductsPage from "../pages/ProductsPage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
