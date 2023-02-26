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

// const uploadHandler = async (images, productId) => {
//   // func js
//   const formData = new FormData();

//   Array.from(images).forEach((image) => {
//     formData.append("images", image);
//   });
//   await axios.post(
//     "/api/products/admin/upload?productId=" + productId,
//     formData
//   );
// };

const AdminEditProductScreen = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    // encode digunakan untuk menyandikan /
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
    // await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
  };

  return (
    <EditProductScreenComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      // uploadHandler={uploadHandler}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminEditProductScreen;
