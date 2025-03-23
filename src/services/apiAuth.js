import axios from "axios";
import store from "../redux/store";
import { createAsyncToast } from "../redux/toastSlice";

const { VITE_BASE_URL } = import.meta.env;

export async function login(account) {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL) {
    console.error("環境變數未正確配置：VITE_BASE_URL 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/admin/signin`;

  try {
    const res = await axios.post(url, account);
    const { expired, token, message } = res.data;

    document.cookie = `hexToken=${token};expires=${new Date(expired)}`;

    axios.defaults.headers.common.Authorization = `${token}`;
    store.dispatch(
      createAsyncToast({ status: "success", text: "登入成功！🎉" })
    );
    return { expired, token, message };
  } catch (error) {
    store.dispatch(
      createAsyncToast({ status: "error", text: error.response.data.message })
    );
    console.error(error);
    return null;
  }
}

export async function logout() {
  const url = `${VITE_BASE_URL}/v2/logout`;
  try {
    axios.post(url);
    store.dispatch(createAsyncToast({ status: "success", text: `登出成功` }));
  } catch (error) {
    store.dispatch(createAsyncToast({ status: "error", text: `登出失敗` }));
  }
}

export async function checkLogin() {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL) {
    console.error("環境變數未正確配置：VITE_BASE_URL 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/api/user/check`;

  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken"))
      ?.split("=")[1];

    axios.defaults.headers.common.Authorization = `${token}`;

    const res = await axios.post(url);

    const { success, uid } = res.data;

    return { success, uid };
  } catch (error) {
    console.error("未登入", error);
    return null;
  }
}
