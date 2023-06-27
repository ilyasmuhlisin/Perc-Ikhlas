import React from "react";
import axios from "axios";
import OrderFamilyDataScreenComponent from "./components/OrderFamilyDataScreenComponent";

const getFamiliesDataOrder = async (id) => {
  const { data } = await axios.get("/api/offline-orders/get-one/" + id);
  return data;
};

function AdminOrdersFamilyScreen() {
  return (
    <OrderFamilyDataScreenComponent
      getFamiliesDataOrder={getFamiliesDataOrder}
    />
  );
}

export default AdminOrdersFamilyScreen;
