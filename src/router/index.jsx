import { createHashRouter } from "react-router-dom";

import FrontLayout from "../layouts/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import ProductsPage from "../pages/ProductsPage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

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
