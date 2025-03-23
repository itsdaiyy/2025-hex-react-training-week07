import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../redux/toastSlice";

function Toast() {
  const messages = useSelector((state) => state.toast.messages);
  const dispatch = useDispatch();

  function handleDismiss(messageId) {
    dispatch(removeToast(messageId));
  }

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 10000 }}>
      {messages.map((message) => (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          key={message.id}
        >
          <div
            className={`toast-header ${
              message.status === "success" ? "bg-success" : `bg-danger`
            } text-white`}
          >
            <strong className="me-auto">
              {message.status === "success" ? "成功" : "失敗"}
            </strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => handleDismiss(message.id)}
            ></button>
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
