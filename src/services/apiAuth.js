import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function login(account) {
  try {
    const res = await axios.post(`${VITE_BASE_URL}/v2/admin/signin`, account);
    const { expired, token, message } = res.data;

    document.cookie = `hexToken=${token};expires=${new Date(expired)}`;

    axios.defaults.headers.common.Authorization = `${token}`;

    return { expired, token, message };
  } catch (error) {
    console.error(error);
  }
}
