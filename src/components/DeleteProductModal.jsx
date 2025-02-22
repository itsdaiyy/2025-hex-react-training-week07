import { Modal } from "bootstrap";
import { deleteProduct, getProducts } from "../services/apiProducts";
import { useEffect, useRef, useState } from "react";

function DeleteProductModal({ tempProduct, setProducts, isOpen, setIsOpen }) {
  // tempProduct 是初始化的狀態
  const [modalData, setModalData] = useState({});
  const deleteProductModalRef = useRef(null);

  //  Modal 初始化
  useEffect(() => {
    new Modal(deleteProductModalRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setModalData({ ...tempProduct });
      const modalInstance = Modal.getInstance(deleteProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen, tempProduct]);

  function handleCloseDeleteProductModal() {
    setIsOpen(false);
    const modalInstance = Modal.getInstance(deleteProductModalRef.current);
    modalInstance.hide();
  }

  async function handleDeleteProduct(id) {
    const res = await deleteProduct(id);
    if (res === null) return;

    handleCloseDeleteProductModal();

    const productsRes = await getProducts();
    if (productsRes === null) return;
    setProducts(productsRes.products);
  }

  return (
    <div
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ref={deleteProductModalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseDeleteProductModal}
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold ms-2">{modalData.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseDeleteProductModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(modalData.id)}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
