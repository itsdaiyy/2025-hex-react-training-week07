import { useEffect, useState } from "react";

import { checkLogin } from "./services/apiAuth";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

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
    <div className="my-5">
      <Products />
      <Cart />

      {isAuth ? <AdminDashboard /> : <Login setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
