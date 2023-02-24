import ProductsScreenComponent from "./components/ProductsScreenComponent";

import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get("/api/products/admin");
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};

function AdminProductsScreen() {
  return (
    <ProductsScreenComponent
      fetchProducts={fetchProducts}
      deleteProduct={deleteProduct}
    />
  );
}

export default AdminProductsScreen;
