import { createHashRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";
import FrontLayout from "../layouts/FrontLayout";

import HomePage from "../pages/front/HomePage";
import ProductsPage from "../pages/front/ProductsPage";
import ProductDetailPage from "../pages/front/ProductDetailPage";
import CartPage from "../pages/front/CartPage";

import AdminPage from "../pages/admin/AdminPage";

import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
