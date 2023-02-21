import ProductListScreenComponent from "./components/ProductListScreenComponent";
import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

function ProductListScreen() {
  return <ProductListScreenComponent getProducts={getProducts} />;
}

export default ProductListScreen;
