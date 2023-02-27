import CreateProductScreenComponent from "./components/CreateProductScreenComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  newCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  // await axios.post(
  //   "/api/products/admin/upload?productId=" + productId,
  //   formData
  // );
  const { data } = await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
  return data;
};

const uploadImagesCloudinaryApiRequest = (images, productId) => {
  const url = "https://api.cloudinary.com/v1_1/doihjccbr/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    // preset upload
    formData.append("upload_preset", "zq7exajr");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        axios.post(
          "/api/products/admin/upload?cloudinary=true&productId=" + productId,
          data
        );
      });
  }
};

const AdminCreateProductScreen = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  return (
    <CreateProductScreenComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
    />
  );
};

export default AdminCreateProductScreen;
