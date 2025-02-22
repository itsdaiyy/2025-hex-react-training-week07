import { useState } from "react";
import { login } from "../services/apiAuth";

function Login({ setIsAuth }) {
  // 儲存使用者表單資料
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 提交登入表單的處理函數
  async function handleSubmit(e) {
    // 防止表單的預設重新整理行為
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      console.error("請輸入使用者名稱和密碼");
      return;
    }

    const res = await login(formData);

    if (!res) {
      console.log("登入失敗");
      return;
    }

    // 判斷是否成功取得 token 並更新認證狀態
    setIsAuth(!!res?.token);

    // 清空表單資料（重置表單）
    setFormData({ username: "", password: "" });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    // 更新對應欄位的值，保留其他欄位不變
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row border justify-content-center row-gap-5 py-5">
        <h2 className="text-center">請先登入</h2>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
        <small className="text-secondary text-center mb-5">
          © 2024~∞ - 六角學院
        </small>
      </div>
    </div>
  );
}

export default Login;
