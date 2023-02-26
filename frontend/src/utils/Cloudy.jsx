import axios from "axios";

export const uploadImagesApiRequest = async (images, productId) => {
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

export const uploadImagesCloudinaryApiRequest = (images, productId) => {
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
