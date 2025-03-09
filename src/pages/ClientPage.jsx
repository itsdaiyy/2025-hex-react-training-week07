import { useState } from "react";
import Cart from "../components/client/Cart";
import Products from "../components/client/Products";
import OrderForm from "../components/client/OrderForm";
import ReactLoading from "react-loading";

function ClientPage({ setIsScreenLoading, isScreenLoading }) {
  const [cart, setCart] = useState({});

  return (
    <div>
      <Products setCart={setCart} setIsScreenLoading={setIsScreenLoading} />
      <Cart
        cart={cart}
        setCart={setCart}
        setIsScreenLoading={setIsScreenLoading}
      />
      <OrderForm setIsScreenLoading={setIsScreenLoading} setCart={setCart} />
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
    </div>
  );
}

export default ClientPage;
