import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";

function RootLayout() {
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
}

export default RootLayout;
