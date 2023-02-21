import ProductDetailsScreenComponent from "./components/ProductDetailsScreenComponent";
import { useEffect } from "react";

// memanggil tindakan
// memilih dan membaca dari redux state
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsScreen = () => {
  const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  return (
    <ProductDetailsScreenComponent
      addToCartHandler={addToCartHandler}
      products={products}
    />
  );
};

export default ProductDetailsScreen;
