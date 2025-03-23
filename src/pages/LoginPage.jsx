import { useEffect, useState } from "react";
import { checkLogin } from "../services/apiAuth";

import Login from "../components/Login";

import ReactLoading from "react-loading";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res?.success) navigate("/admin");
    })();
  }, [navigate]);

  return (
    <>
      <div className="my-5 container">
        <Login setIsScreenLoading={setIsScreenLoading} />

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
            <ReactLoading
              type="spin"
              color="black"
              width="4rem"
              height="4rem"
            />
          </div>
        )}
        <Toaster />
      </div>
    </>
  );
}

export default LoginPage;
