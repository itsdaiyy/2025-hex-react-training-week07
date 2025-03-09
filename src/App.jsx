import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { checkLogin } from "./services/apiAuth";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ClientPage from "./pages/ClientPage";

function App() {
  // 儲存使用者認證狀態
  const [isAuth, setIsAuth] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res?.success) setIsAuth(true);
    })();
  }, []);

  return (
    <div className="my-5">
      <ClientPage
        setIsScreenLoading={setIsScreenLoading}
        isScreenLoading={isScreenLoading}
      />
      {isAuth ? <AdminDashboard /> : <Login setIsAuth={setIsAuth} />}

      <Toaster />
    </div>
  );
}

export default App;
