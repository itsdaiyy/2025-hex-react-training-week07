import { useState } from "react";
import { checkLogin } from "../services/apiAuth";

function CheckLogin() {
  const [message, setMessage] = useState("");

  async function handleCheckLogin() {
    const res = await checkLogin();
    setMessage(res?.success ? "🎉 登入狀態！" : "❌ 未登入");
  }

  return (
    <div className="container my-4 d-flex align-items-center">
      <button
        type="button"
        className="btn btn-outline-primary me-4"
        onClick={handleCheckLogin}
      >
        確認是否登入
      </button>
      <span>{message}</span>
    </div>
  );
}

export default CheckLogin;
