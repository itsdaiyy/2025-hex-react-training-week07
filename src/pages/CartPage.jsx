import { useEffect, useState } from "react";
import { clientClearCart, clientGetCart } from "../services/apiCart";

import ReactLoading from "react-loading";
import CartItem from "../components/client/CartItem";
import OrderForm from "../components/client/OrderForm";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsScreenLoading(true);
      const res = await clientGetCart();
      setCart(res.data);
      setIsScreenLoading(false);
    })();
  }, [setCart]);

  async function handleClearCart() {
    setIsScreenLoading(true);
    const clearRes = await clientClearCart();
    if (clearRes === null) return;

    const res = await clientGetCart();
    if (res === null) return;
    setCart(res.data);
    setIsScreenLoading(false);
  }

  return (
    <>
      <div className="container my-4">
        {cart.carts?.length > 0 && (
          <div className="text-end py-4 px-5 border mb-4">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleClearCart}
            >
              清空購物車
            </button>
          </div>
        )}

        <div className="container">
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style={{ width: "150px" }}>數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              {/* Cart rows here */}
              {cart.carts?.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    setCart={setCart}
                    setIsScreenLoading={setIsScreenLoading}
                  />
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  總計
                </td>
                <td className="text-end">{cart.total}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end text-success">
                  折扣價
                </td>
                <td className="text-end text-success">{cart.final_total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="container my-5">
        <OrderForm setIsScreenLoading={setIsScreenLoading} setCart={setCart} />
      </div>
      {isScreenLoading && (
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
      )}
    </>
  );
}

export default CartPage;
