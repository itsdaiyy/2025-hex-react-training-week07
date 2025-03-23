import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientGetSingleProduct } from "../../services/apiProducts";
import { clientAddCartItem } from "../../services/apiCart";

import ReactLoading from "react-loading";

function ProductDetailPage() {
  const { id: product_id } = useParams();
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState("");
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. useEffect 取得單一產品資料 API
  useEffect(() => {
    (async () => {
      setIsScreenLoading(true);

      const res = await clientGetSingleProduct(product_id);
      if (res) setProduct(res.product);

      setIsScreenLoading(false);
    })();
  }, [product_id]);

  async function handleAddCartItem(id, qty) {
    setIsLoading(true);
    await clientAddCartItem(id, qty);
    setIsLoading(false);
  }

  if (isScreenLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.3)",
          zIndex: 999,
        }}
      >
        <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img
            className="img-fluid"
            src={product.imageUrl}
            alt={product.title}
          />
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center gap-2">
            <h2>{product.title}</h2>
            <span className="badge text-bg-success">{product.category}</span>
          </div>
          <p className="mb-3">{product.description}</p>
          <p className="mb-3">{product.content}</p>
          <h5 className="mb-3">NT$ {product.price}</h5>
          <div className="input-group align-items-center w-75">
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
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => handleAddCartItem(product_id, qtySelect)}
              disabled={isLoading}
            >
              加入購物車
              {isLoading && (
                <ReactLoading
                  type={"spin"}
                  color={"#000"}
                  height={"1.5rem"}
                  width={"1.5rem"}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
