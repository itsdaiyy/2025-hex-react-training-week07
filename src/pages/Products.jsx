import { useEffect, useState } from "react";
import { clientGetProducts } from "../services/apiProducts";
import ProductDetailModal from "../components/client/ProductDetailModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await clientGetProducts();
      setProducts(data.products);
    })();
  }, []);

  function handleMoreDetail(product) {
    setIsDetailModalOpen(true);
    setTempProduct(product);
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
            <div className="col-md-3 col-6" key={id}>
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
                <div className="card-footer p-0">
                  <div
                    className="btn-group mt-auto w-100 rounded-0"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      className="btn btn-outline-secondary rounded-0"
                      type="button"
                    >
                      加入購物車
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-0"
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
        setIsOpen={setIsDetailModalOpen}
        isOpen={isDetailModalOpen}
        tempProduct={tempProduct}
      />
    </div>
  );
}

export default Products;
