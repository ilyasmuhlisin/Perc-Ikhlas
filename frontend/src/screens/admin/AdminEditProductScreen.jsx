import EditProductScreenComponent from "./components/EditProductScreenComponent";

import { useSelector } from "react-redux";
import axios from "axios";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = (productId, formInputs) => {
  console.log(productId);
  console.log(formInputs);
};

const AdminEditProductScreen = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <EditProductScreenComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
    />
  );
};

export default AdminEditProductScreen;
