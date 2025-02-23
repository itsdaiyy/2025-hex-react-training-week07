import { useEffect, useState } from "react";

import { getProducts } from "../services/apiAdminProducts";

import ProductsListItem from "../components/ProductsListItem";
import ProductModal from "../components/ProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import Pagination from "../components/Pagination";

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const [pageInfo, setPageInfo] = useState({});

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 載入產品
  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();

      setProducts(data?.products || []);
      setPageInfo(data?.pagination);
    };
    getData();
  }, []);

  // Open DeleteProductModal
  function handleOpenDeleteProductModal(product) {
    setTempProduct(product);
    setIsDeleteModalOpen(true);
  }

  // Open ProductModal
  function handleOpenProductModal(mode, product = defaultModalState) {
    setModalMode(mode);
    setTempProduct(product);
    setIsProductModalOpen(true);
  }

  return (
    <>
      <div className="container py-4 px-5 border mb-4 text-end">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handleOpenProductModal("create")}
        >
          建立新的產品
        </button>
      </div>
      <div className="container py-5 px-4 border">
        <div className="row gy-5">
          <div className="col text-center row-gap-2">
            <h2 className="text-center mb-4">產品列表</h2>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">類別</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <ProductsListItem
                      key={product.id}
                      product={product}
                      onEdit={() => handleOpenProductModal("edit", product)}
                      onDelete={() => handleOpenDeleteProductModal(product)}
                      setProducts={setProducts}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <Pagination
          pageInfo={pageInfo}
          setProducts={setProducts}
          setPageInfo={setPageInfo}
        />
      </div>
      <ProductModal
        tempProduct={tempProduct}
        modalMode={modalMode}
        setProducts={setProducts}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
      />
      <DeleteProductModal
        tempProduct={tempProduct}
        setProducts={setProducts}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </>
  );
}

export default AdminDashboard;
