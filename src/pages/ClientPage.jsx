import { useState } from "react";
import Cart from "../components/client/Cart";
import Products from "../components/client/Products";
import OrderForm from "../components/client/OrderForm";

function ClientPage() {
  const [cart, setCart] = useState({});

  return (
    <div>
      <Products setCart={setCart} />
      <Cart cart={cart} setCart={setCart} />
      <OrderForm />
    </div>
  );
}

export default ClientPage;
