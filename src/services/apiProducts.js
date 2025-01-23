import axios from "axios";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function getProducts() {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL || !VITE_API_PATH) {
    console.error("環境變數未正確配置：VITE_BASE_URL 或 VITE_API_PATH 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/products`;

  try {
    // 發送 GET 請求以取得產品資料
    const res = await axios.get(url);

    const { products } = res.data;

    return products;
  } catch (error) {
    console.error(`取得產品發生錯誤：`, error);
    return null;
  }
}
