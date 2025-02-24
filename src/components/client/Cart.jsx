import { useEffect } from "react";
import { clientClearCart, clientGetCart } from "../../services/apiCart";
import CartItem from "./CartItem";

function Cart({ cart, setCart }) {
  useEffect(() => {
    (async () => {
      const res = await clientGetCart();
      console.log(res.data);
      setCart(res.data);
    })();
  }, [setCart]);

  async function handleClearCart() {
    const clearRes = await clientClearCart();
    if (clearRes === null) return;

    const res = await clientGetCart();
    if (res === null) return;
    setCart(res.data);
  }

  return (
    <>
      {cart.carts?.length > 0 && (
        <div className="container text-end py-4 px-5 border mb-4">
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
    </>
  );
}

export default Cart;
