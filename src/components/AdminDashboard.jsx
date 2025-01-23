import { useEffect, useState } from "react";

import { getProducts } from "../services/apiProducts";

import ProductsListItem from "./ProductsListItem";
import ProductDetails from "./ProductDetails";
import EmptyMessage from "./EmptyMessage";

function AdminDashboard() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();
      if (data === null) {
        setProducts([]);
        return;
      }
      setProducts(data);
    };
    getData();
  }, []);

  function handleCheckDetails(product) {
    setSingleProduct(product);
  }

  return (
    <div className="container py-5 px-4 border">
      <div className="row gy-5">
        <div className="col-md-6 text-center row-gap-2">
          <h2 className="text-center mb-4">產品列表</h2>
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <ProductsListItem
                    key={product.id}
                    product={product}
                    onClick={handleCheckDetails}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-6 row-gap-2">
          <h2 className="text-center mb-4">單一產品細節</h2>
          {/* 若有選中產品，顯示其詳細資訊 */}
          {/* 若未選中任何產品，顯示空訊息 */}
          {singleProduct ? (
            <ProductDetails product={singleProduct} />
          ) : (
            <EmptyMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
