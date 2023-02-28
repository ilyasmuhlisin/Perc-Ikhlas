import ProductListScreenComponent from "./components/ProductListScreenComponent";
import axios from "axios";

import { useSelector } from "react-redux";

const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

function ProductListScreen() {
  const { categories } = useSelector((state) => state.getCategories);

  return <ProductListScreenComponent getProducts={getProducts} categories ={categories}/>;
}

export default ProductListScreen;
