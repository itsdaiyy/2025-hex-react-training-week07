import { useEffect, useRef, useState } from "react";
import {
  addProduct,
  getProducts,
  updateProduct,
  uploadImage,
} from "../../services/apiAdminProducts";
import { Modal } from "bootstrap";

function ProductModal({
  tempProduct,
  modalMode,
  setProducts,
  isOpen,
  setIsOpen,
}) {
  const [modalData, setModalData] = useState(tempProduct);
  const productModalRef = useRef(null);
  const modalInstance = useRef(null);

  // ref 初始化
  useEffect(() => {
    modalInstance.current = new Modal(productModalRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setModalData({ ...tempProduct });
      modalInstance.current.show();
    }
  }, [isOpen, tempProduct]);

  useEffect(() => {
    productModalRef.current.addEventListener("hide.bs.modal", () => {
      setIsOpen(false);
    });
  }, [setIsOpen]);

  // Close ProductModal
  function handleCloseProductModal() {
    modalInstance.current.hide();
  }

  function handleModalInputChange(e) {
    const { name, value, checked, type } = e.target;
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubImagesChange(e, index) {
    const { value } = e.target;
    const newSubImages = [...modalData.imagesUrl];

    newSubImages[index] = value;

    setModalData({
      ...modalData,
      imagesUrl: newSubImages,
    });
  }

  function handleAddSubImage() {
    const newImages = [...modalData.imagesUrl, ""];
    setModalData({ ...modalData, imagesUrl: newImages });
  }

  function handleRemoveSubImage() {
    const newImages = [...modalData.imagesUrl];
    newImages.pop();
    setModalData({ ...modalData, imagesUrl: newImages });
  }

  async function handleModalSubmit() {
    const apiCall = modalMode === "create" ? addProduct : updateProduct;

    const res = await apiCall(modalData);
    if (res === null) return;

    handleCloseProductModal();

    const productsRes = await getProducts();
    if (productsRes === null) return;
    setProducts(productsRes.products);
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    const uploadedImageUrl = await uploadImage(file);
    setModalData({ ...modalData, imageUrl: uploadedImageUrl });
    e.target.value = "";
  }

  return (
    <div
      id="productModal"
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ref={productModalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fs-4">
              {modalMode === "create" ? "新增產品" : "編輯產品"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseProductModal}
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="mb-5">
                  <label htmlFor="fileInput" className="form-label">
                    圖片上傳
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="form-control"
                    id="fileInput"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="primary-image" className="form-label">
                    主圖
                  </label>
                  <div className="input-group">
                    <input
                      name="imageUrl"
                      type="text"
                      id="primary-image"
                      className="form-control"
                      placeholder="請輸入圖片連結"
                      value={modalData.imageUrl}
                      onChange={handleModalInputChange}
                    />
                  </div>
                  <img
                    src={modalData.imageUrl}
                    alt={modalData.title}
                    className="img-fluid"
                  />
                </div>

                {/* 副圖 */}
                <div className="border border-2 border-dashed rounded-3 p-3">
                  {modalData.imagesUrl?.map((image, index) => (
                    <div key={index} className="mb-2">
                      <label
                        htmlFor={`imagesUrl-${index + 1}`}
                        className="form-label"
                      >
                        副圖 {index + 1}
                      </label>
                      <input
                        id={`imagesUrl-${index + 1}`}
                        type="text"
                        placeholder={`圖片網址 ${index + 1}`}
                        className="form-control mb-2"
                        value={image}
                        onChange={(e) => handleSubImagesChange(e, index)}
                      />

                      {image && (
                        <img
                          src={image}
                          alt={`副圖 ${index + 1}`}
                          className="img-fluid mb-2"
                        />
                      )}
                    </div>
                  ))}

                  <div className="btn-group w-100">
                    {modalData.imagesUrl.length < 5 &&
                      modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                        "" && (
                        <button
                          className="btn btn-outline-primary btn-sm w-100"
                          onClick={() => handleAddSubImage()}
                        >
                          新增圖片
                        </button>
                      )}
                    {modalData.imagesUrl.length > 1 && (
                      <button
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={() => handleRemoveSubImage()}
                      >
                        取消圖片
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    標題
                  </label>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入標題"
                    value={modalData.title}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    分類
                  </label>
                  <input
                    name="category"
                    id="category"
                    type="text"
                    className="form-control"
                    placeholder="請輸入分類"
                    value={modalData.category}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="unit" className="form-label">
                    單位
                  </label>
                  <input
                    name="unit"
                    id="unit"
                    type="text"
                    className="form-control"
                    placeholder="請輸入單位"
                    value={modalData.unit}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label htmlFor="origin_price" className="form-label">
                      原價
                    </label>
                    <input
                      name="origin_price"
                      id="origin_price"
                      type="number"
                      className="form-control"
                      placeholder="請輸入原價"
                      value={modalData.origin_price}
                      onChange={handleModalInputChange}
                      min={0}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="price" className="form-label">
                      售價
                    </label>
                    <input
                      name="price"
                      id="price"
                      type="number"
                      className="form-control"
                      placeholder="請輸入售價"
                      value={modalData.price}
                      onChange={handleModalInputChange}
                      min={0}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    產品描述
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入產品描述"
                    value={modalData.description}
                    onChange={handleModalInputChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    說明內容
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入說明內容"
                    value={modalData.content}
                    onChange={handleModalInputChange}
                  ></textarea>
                </div>

                <div className="form-check">
                  <input
                    name="is_enabled"
                    type="checkbox"
                    className="form-check-input"
                    id="isEnabled"
                    checked={modalData.is_enabled}
                    onChange={handleModalInputChange}
                  />
                  <label className="form-check-label" htmlFor="isEnabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseProductModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSubmit}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
