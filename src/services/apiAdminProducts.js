import axios from "axios";
import store from "../redux/store";
import { addToast } from "../redux/toastSlice";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function getProducts(page = 1) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/products?page=${page}`;

  try {
    // 發送 GET 請求以取得產品資料
    const res = await axios.get(url);
    const data = res.data;

    return data;
  } catch (error) {
    console.error(`讀取產品發生錯誤`, error);
    store.dispatch(addToast({ type: "error", message: "讀取產品失敗" }));
    return null;
  }
}

export async function addProduct(product) {
  const newProduct = {
    ...product,
    origin_price: Number(product.origin_price),
    price: Number(product.price),
    is_enabled: product.is_enabled ? 1 : 0,
  };

  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product`;

  try {
    await axios.post(url, {
      data: newProduct,
    });
    store.dispatch(addToast({ type: "success", message: "成功建立產品！🎉" }));
  } catch (error) {
    store.dispatch(
      addToast({ type: "error", message: "新增產品發生錯誤...☹️" })
    );
    console.error(`新增產品發生錯誤：`, error);
    return null;
  }
}

export async function deleteProduct(productId) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${productId}`;

  try {
    const res = await axios.delete(url);
    const data = res.data;

    store.dispatch(addToast({ type: "success", message: "成功刪除產品！🎉" }));

    return data;
  } catch (error) {
    store.dispatch(
      addToast({ type: "error", message: "刪除產品發生錯誤...☹️" })
    );
    console.error(`刪除產品發生錯誤`, error);
    return null;
  }
}

export async function updateProduct(product) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${product.id}`;

  const newProduct = {
    ...product,
    origin_price: Number(product.origin_price),
    price: Number(product.price),
    is_enabled: product.is_enabled ? 1 : 0,
  };

  try {
    const res = await axios.put(url, {
      data: newProduct,
    });
    const data = res.data;

    store.dispatch(addToast({ type: "success", message: "成功更新產品！🎉" }));

    return data;
  } catch (error) {
    store.dispatch(
      addToast({ type: "error", message: "更新產品發生錯誤...☹️" })
    );
    console.error(error);
    return null;
  }
}

export async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append("file-to-upload", imageFile);

  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/upload
`;

  try {
    const res = await axios.post(url, formData);
    const uploadedImageUrl = res.data.imageUrl;

    store.dispatch(addToast({ type: "success", message: "成功上傳圖片！🎉" }));

    return uploadedImageUrl;
  } catch (error) {
    store.dispatch(
      addToast({ type: "error", message: "上傳圖片發生錯誤...☹️" })
    );
    console.error(error);
    return null;
  }
}
