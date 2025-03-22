import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function ToastManager() {
  const toasts = useSelector((state) => state.toast);

  useEffect(() => {
    if (toasts.length > 0) {
      const { type, message } = toasts[0];
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [toasts]);

  return null;
}

export default ToastManager;
