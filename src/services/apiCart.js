import axios from "axios";
import toast from "react-hot-toast";

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

export async function clientAddCartItem(product_id, qty) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;

  try {
    const res = await axios.post(url, {
      data: {
        product_id,
        qty: Number(qty),
      },
    });

    toast.success("成功加入購物車！🎉");

    return res.data;
  } catch (error) {
    toast.error("加入購物車失敗☹️");
    console.error(`加入購物車發生錯誤`, error);
    return null;
  }
}

export async function clientClearCart() {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`;

  try {
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    toast.error("清除購物車失敗☹️");
    console.error(`清除購物車發生錯誤`, error);
    return null;
  }
}

export async function clientRemoveCartItem(id) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${id}`;

  try {
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    toast.error("移除購物車失敗☹️");
    console.error(`移除產品失敗`, error);
    return null;
  }
}

export async function clientUpdateCartItem(cartId, product_id, qty) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${cartId}`;

  try {
    const res = await axios.put(url, {
      data: { product_id, qty: Number(qty) },
    });
    return res.data;
  } catch (error) {
    toast.error("更新失敗☹️");
    console.error(`更新產品數量失敗`, error);
    return null;
  }
}
