import axios from "axios";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function clientGetProducts() {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products`;

  try {
    const res = await axios.get(url);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(`客戶端，取得產品發生錯誤`, error);
  }
}
