import { useState } from "react";
import Cart from "../components/client/Cart";
import Products from "../components/client/Products";
import OrderForm from "../components/client/OrderForm";

function ClientPage({ setIsScreenLoading }) {
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
    </div>
  );
}

export default ClientPage;
