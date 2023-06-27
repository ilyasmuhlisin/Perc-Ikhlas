import React from "react";
import AddOfflineOrdersScreenComponent from "./components/AddOfflineOrdersScreenComponent";

import axios from "axios";

const createOfflineOrdersApiRequest = async (formxInputs) => {
  const { data } = await axios.post(`/api/offline-orders/create/admin`, {
    ...formxInputs,
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
