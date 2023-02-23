import CartScreenComponent from "./components/CartScreenComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const reduxDispatch = useDispatch();

  return (
    <CartScreenComponent
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default CartScreen;
