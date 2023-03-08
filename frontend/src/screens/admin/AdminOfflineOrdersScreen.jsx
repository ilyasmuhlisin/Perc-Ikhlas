import React from "react";
import OfflineOrdersScreenComponent from "./components/OfflineOrdersScreenComponent";
import axios from "axios";

const fetchOfflineOrders = async () => {
  const { data } = await axios.get("/api/offline-orders/admin");
  return data;
};

// const deleteProduct = async (productId) => {
//   const { data } = await axios.delete(`/api/products/admin/${productId}`);
//   return data;
// };

function AdminOfflineOrdersScreen() {
  return (
    <OfflineOrdersScreenComponent fetchOfflineOrders={fetchOfflineOrders} />
  );
}

export default AdminOfflineOrdersScreen;
