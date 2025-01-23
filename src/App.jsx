import { useState } from "react";
import { login } from "./services/apiAuth";
import axios from "axios";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";

// 1. 讀取 input 欄位
// 2. 存入 state
// 3.

function App() {
  const [formData, setFormData] = useState({
    username: "behoya11@gmail.com",
    password: "Googi)5)1",
  });
  const [isAuth, setIsAuth] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) return;

    const res = await login(formData);
    setIsAuth(!!res?.token);
    // setFormData({ email: "", password: "" });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <>
      {isAuth ? (
        <AdminDashboard />
      ) : (
        <Login
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
}

export default App;
