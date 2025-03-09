import axios from "axios";
import toast from "react-hot-toast";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

// /v2/api/{api_path}/order

export async function createOrder(userInfo) {
  try {
    const res = await axios.post(
      `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/order`,
      {
        data: userInfo,
      }
    );

    const data = res.data;
    toast.success(`建立訂單成功！🎉`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("建立訂單失敗☹️");
  }
}
