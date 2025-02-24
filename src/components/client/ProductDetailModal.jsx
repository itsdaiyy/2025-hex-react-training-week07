import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { clientAddCartItem, clientGetCart } from "../../services/apiCart";

function ProductDetailModal({
  tempProduct,
  isOpen,
  setIsOpen,
  setCart,
  onAddCartItem,
}) {
  const [qtySelect, setQtySelect] = useState("1");
  const productModalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    modalInstance.current = new Modal(productModalRef.current);
    console.log(productModalRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      openModal();
    }
  }, [isOpen]);

  useEffect(() => {
    productModalRef.current.addEventListener("hide.bs.modal", () => {
      setIsOpen(false);
    });
  }, [setIsOpen]);

  const openModal = () => {
    modalInstance.current.show();
  };

  const closeModal = () => {
    modalInstance.current.hide();
  };

  async function handleAddCartItem(id, qty) {
    await clientAddCartItem(id, qty);

    closeModal();

    const res = await clientGetCart();
    setCart(res.data);
  }

  return (
    <div
      ref={productModalRef}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="modal fade"
      id="productModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5">產品名稱：{tempProduct.title}</h2>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={tempProduct.imageUrl}
              alt={tempProduct.title}
              className="img-fluid"
            />
            <p>{tempProduct.content}</p>
            <p>{tempProduct.description}</p>
            <p>
              價錢：{tempProduct.price} <del>{tempProduct.origin_price}</del> 元
            </p>
            <div className="input-group align-items-center">
              <label htmlFor="qtySelect">數量：</label>
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleAddCartItem(tempProduct.id, qtySelect)}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
