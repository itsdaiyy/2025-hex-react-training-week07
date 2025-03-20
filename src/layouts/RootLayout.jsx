import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ToastManager from "../components/ToastManager";

function RootLayout() {
  return (
    <>
      <ToastManager />
      <Toaster />
      <Outlet />
    </>
  );
}

export default RootLayout;
