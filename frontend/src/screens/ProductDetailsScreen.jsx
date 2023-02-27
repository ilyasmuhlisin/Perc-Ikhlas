import ProductDetailsScreenComponent from "./components/ProductDetailsScreenComponent";
import { useEffect } from "react";

// memanggil tindakan
// memilih dan membaca dari redux state
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/actions/cartActions";
import axios from "axios";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const writeReviewApiRequest = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/users/review/${productId}`, {
    ...formInputs,
  });
  return data;
};

const ProductDetailsScreen = () => {
  // const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  // const addToCartHandler = () => {
  //   dispatch(addToCart());
  // };

  return (
    <ProductDetailsScreenComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      userInfo={userInfo}
      writeReviewApiRequest={writeReviewApiRequest}
      // addToCartHandler={addToCartHandler}
      // products={products}
    />
  );
};

export default ProductDetailsScreen;
