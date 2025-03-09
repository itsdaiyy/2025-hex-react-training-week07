import { useEffect, useState } from "react";

import { clientGetProducts } from "../../services/apiProducts";
import { clientAddCartItem, clientGetCart } from "../../services/apiCart";

import ProductDetailModal from "./ProductDetailModal";

function Products({ setCart, setIsScreenLoading }) {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsScreenLoading(true);
      const data = await clientGetProducts();
      setProducts(data.products);
      setIsScreenLoading(false);
    })();
  }, [setIsScreenLoading]);

  function handleMoreDetail(product) {
    setIsDetailModalOpen(true);
    setTempProduct(product);
  }

  async function handleAddCartItem(id, qty) {
    setIsScreenLoading(true);
    await clientAddCartItem(id, qty);
    const res = await clientGetCart();
    setCart(res.data);
    setIsScreenLoading(false);
  }

  return (
    <div className="container my-5">
      <div className="row gy-4">
        {products.map((product) => {
          const {
            id,
            category,
            content,
            description,
            imageUrl,
            imagesUrl,
            origin_price,
            price,
            title,
            unit,
            num,
          } = product;
          return (
            <div className="col-lg-3 col-md-4 col-6" key={id}>
              <div className="card h-100">
                <img
                  src={imageUrl}
                  className="card-img-top object-fit-cover"
                  alt={title}
                  style={{ aspectRatio: `3/2` }}
                />
                <div className="card-body  d-flex flex-column">
                  <h5 className="card-title fs-6">{title}</h5>
                </div>
                <div className="card-footer p-0 border-top-0">
                  <div
                    className="btn-group mt-auto w-100 "
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      className="btn btn-outline-secondary rounded-top-0"
                      type="button"
                      onClick={() => handleAddCartItem(id, 1)}
                    >
                      加入購物車
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-top-0"
                      type="button"
                      onClick={() => handleMoreDetail(product)}
                    >
                      查看細節
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ProductDetailModal
        setIsScreenLoading={setIsScreenLoading}
        setIsOpen={setIsDetailModalOpen}
        isOpen={isDetailModalOpen}
        tempProduct={tempProduct}
        setCart={setCart}
      />
    </div>
  );
}

export default Products;
