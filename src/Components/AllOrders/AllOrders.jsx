import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/cartContext";

export default function AllOrders() {
  let { clearCart } = useContext(CartContext);
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <h1 className="text-5xl py-16">AllOrders</h1>
    </>
  );
}
