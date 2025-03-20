import axios from "axios";
import store from "../redux/store";
import { addToast } from "../redux/toastSlice";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function createOrder(userInfo) {
  try {
    const res = await axios.post(
      `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/order`,
      {
        data: userInfo,
      }
    );

    const data = res.data;
    store.dispatch(addToast({ type: "success", message: "成功建立訂單！🎉" }));
    return data;
  } catch (error) {
    console.error(error);

    store.dispatch(addToast({ type: "error", message: "建立訂單失敗...☹️" }));
  }
}
