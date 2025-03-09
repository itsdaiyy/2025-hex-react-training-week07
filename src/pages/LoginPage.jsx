import { useEffect, useState } from "react";
import { checkLogin } from "../services/apiAuth";

import Login from "../components/Login";
import AdminDashboard from "./AdminDashboard";

import ReactLoading from "react-loading";
import { Toaster } from "react-hot-toast";

function LoginPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res?.success) setIsAuth(true);
    })();
  }, []);

  return (
    <div className="my-5 container">
      {isAuth ? (
        <AdminDashboard setIsScreenLoading={setIsScreenLoading} />
      ) : (
        <Login setIsAuth={setIsAuth} />
      )}

      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default LoginPage;
