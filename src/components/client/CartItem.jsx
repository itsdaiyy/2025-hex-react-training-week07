import {
  clientGetCart,
  clientRemoveCartItem,
  clientUpdateCartItem,
} from "../../services/apiCart";

function CartItem({ cartItem, setCart }) {
  const { product } = cartItem;

  async function handleRemoveItem(id) {
    const removeRes = await clientRemoveCartItem(id);
    if (removeRes === null) return;

    const res = await clientGetCart();
    if (res === null) return;
    setCart(res.data);
  }

  async function handleUpdateCartItem(cartId, product_id, qty) {
    let success = false;

    if (qty === 0) {
      const removeRes = await clientRemoveCartItem(cartId);
      success = removeRes !== null;
    } else {
      const updateRes = await clientUpdateCartItem(cartId, product_id, qty);
      success = updateRes !== null;
    }

    if (success) {
      const res = await clientGetCart();
      if (res) setCart(res.data);
    }
  }

  return (
    <tr key={cartItem.id}>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleRemoveItem(cartItem.id)}
        >
          x
        </button>
      </td>
      <td>{product.title}</td>
      <td style={{ width: "150px" }}>
        <div className="d-flex align-items-center">
          <div className="btn-group me-2" role="group">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() =>
                handleUpdateCartItem(
                  cartItem.id,
                  cartItem.product_id,
                  cartItem.qty - 1
                )
              }
            >
              -
            </button>
            <span
              className="btn border border-dark"
              style={{ width: "50px", cursor: "auto" }}
            >
              {cartItem.qty}
            </span>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() =>
                handleUpdateCartItem(
                  cartItem.id,
                  cartItem.product_id,
                  cartItem.qty + 1
                )
              }
            >
              +
            </button>
          </div>
          <span className="input-group-text bg-transparent border-0">
            {product.unit}
          </span>
        </div>
      </td>
      <td className="text-end">{cartItem.total}</td>
    </tr>
  );
}

export default CartItem;
