import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function clientGetCart() {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`取得購物車發生錯誤`, error);
    return null;
  }
}
