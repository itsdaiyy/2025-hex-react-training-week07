import axios from "axios";
import store from "../redux/store";
import { addToast } from "../redux/toastSlice";

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

    store.dispatch(
      addToast({ type: "success", message: "成功加入購物車！🎉" })
    );
    return res.data;
  } catch (error) {
    store.dispatch(addToast({ type: "error", message: "入購物車失敗...☹️" }));
    console.error(`加入購物車發生錯誤`, error);
    return null;
  }
}

export async function clientClearCart() {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`;

  try {
    const res = await axios.delete(url);
    store.dispatch(
      addToast({ type: "success", message: "成功清除購物車！🎉" })
    );
    return res.data;
  } catch (error) {
    store.dispatch(addToast({ type: "error", message: "清除購物車失敗...☹️" }));
    console.error(`清除購物車發生錯誤`, error);
    return null;
  }
}

export async function clientRemoveCartItem(id) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${id}`;

  try {
    const res = await axios.delete(url);
    store.dispatch(addToast({ type: "success", message: "成功移除產品！🎉" }));
    return res.data;
  } catch (error) {
    store.dispatch(addToast({ type: "error", message: "移除產品失敗...☹️" }));
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
    store.dispatch(
      addToast({ type: "error", message: "更新產品數量失敗...☹️" })
    );
    console.error(`更新產品數量失敗`, error);
    return null;
  }
}
