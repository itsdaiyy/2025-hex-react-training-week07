import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function FrontLayout() {
  return (
    <>
      <Navbar
        routes={[
          { path: "/", name: "首頁" },
          { path: "/products", name: "產品列表" },
          { path: "/cart", name: "購物車" },
          { path: "/login", name: "管理者" },
        ]}
      />
      <Outlet />
    </>
  );
}

export default FrontLayout;
