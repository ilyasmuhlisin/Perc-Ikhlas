import React from "react";
import OfflineOrderDetailsScreenComponent from "./components/OfflineOrderDetailsScreenComponent";
import axios from "axios";

const getOfflineOrder = async (id) => {
  const { data } = await axios.get("/api/offline-orders/admin/get-one/" + id);
  return data;
};

function AdminOfflineOrderDetailsScreen() {
  return (
    <OfflineOrderDetailsScreenComponent getOfflineOrder={getOfflineOrder} />
  );
}

export default AdminOfflineOrderDetailsScreen;
