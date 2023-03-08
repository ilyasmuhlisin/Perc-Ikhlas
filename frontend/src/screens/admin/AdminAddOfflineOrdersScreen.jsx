import React from "react";
import AddOfflineOrdersScreenComponent from "./components/AddOfflineOrdersScreenComponent";

import axios from "axios";

const createOfflineOrdersApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/offline-orders/admin`, {
    ...formInputs,
  });
  return data;
};

function AdminAddOfflineOrdersScreen() {
  return (
    <AddOfflineOrdersScreenComponent
      createOfflineOrdersApiRequest={createOfflineOrdersApiRequest}
    />
  );
}

export default AdminAddOfflineOrdersScreen;
