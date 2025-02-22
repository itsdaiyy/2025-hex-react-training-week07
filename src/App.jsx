import { useEffect, useState } from "react";

import { checkLogin} from "./services/apiAuth";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import CheckLogin from "./components/CheckLogin";

function App() {
  // 儲存使用者認證狀態
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res?.success) setIsAuth(true);
    })();
  }, []);

  return (
    <>
      <CheckLogin />
      {isAuth ? <AdminDashboard /> : <Login setIsAuth={setIsAuth} />}
    </>
  );
}

export default App;
