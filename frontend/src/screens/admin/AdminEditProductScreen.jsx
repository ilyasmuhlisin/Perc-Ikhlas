import EditProductScreenComponent from "./components/EditProductScreenComponent";

import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  // console.log(productId);
  // console.log(formInputs);
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const uploadHandler = async (images, productId) => {
  // func js
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
};

const AdminEditProductScreen = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    // encode digunakan untuk menyandikan /
    let encoded = encodeURIComponent(imagePath);
    await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
  };

  return (
    <EditProductScreenComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadHandler={uploadHandler}
    />
  );
};

export default AdminEditProductScreen;
