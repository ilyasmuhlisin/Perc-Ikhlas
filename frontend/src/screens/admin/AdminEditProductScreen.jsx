import EditProductScreenComponent from "./components/EditProductScreenComponent";

import { useSelector } from "react-redux";

const AdminEditProductScreen = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return <EditProductScreenComponent categories={categories} />;
};

export default AdminEditProductScreen;
