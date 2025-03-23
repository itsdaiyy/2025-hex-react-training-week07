import { useState } from "react";
import { login } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login({ setIsScreenLoading }) {
  const navigate = useNavigate();

  // 儲存使用者表單資料
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 提交登入表單的處理函數
  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;

    if (!username || !password) {
      console.error("請輸入使用者名稱和密碼");
      return;
    }
    setIsScreenLoading(true);
    const res = await login(data);

    // 判斷是否成功取得 token 並更新認證狀態
    if (res?.token) {
      navigate("/admin");
    }
    // 清空表單資料（重置表單）
    reset();
    setIsScreenLoading(false);
  });

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row border justify-content-center row-gap-5 py-5">
        <h2 className="text-center">請先登入</h2>
        <div className="col-8">
          <form onSubmit={onSubmit}>
            <div className="form-floating mb-3">
              <input
                {...register("username", {
                  required: "username 欄位必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "格式錯誤",
                  },
                })}
                id="username"
                type="email"
                name="username"
                className="form-control"
                placeholder="name@example.com"
              />
              <label htmlFor="username">Email address</label>
              {errors.username && (
                <p className="text-danger my-2">{errors.username.message}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                {...register("password", {
                  required: "密碼欄位必填",
                })}
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && (
                <p className="text-danger my-2">{errors.password.message}</p>
              )}
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
