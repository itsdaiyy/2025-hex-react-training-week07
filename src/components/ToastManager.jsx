import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../redux/toastSlice";
import toast from "react-hot-toast";

function ToastManager() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast);

  useEffect(() => {
    if (toasts.length > 0) {
      const { type, message } = toasts[0];

      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
      dispatch(removeToast());
    }
  }, [toasts, dispatch]);

  return null;
}

export default ToastManager;
