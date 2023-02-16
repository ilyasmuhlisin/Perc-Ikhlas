import OrderDetailsScreenComponent from "./components/OrderDetailsScreenComponent";

import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id);
  return data;
};

const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/orders/delivered/" + id);
  if (data) {
    return data;
  }
};

const markAsPaid = async (id) => {
  const { data } = await axios.put("/api/orders/paid/" + id);
  if (data) {
    return data;
  }
};

function AdminOrderDetailsScreen() {
  return (
    <OrderDetailsScreenComponent
      getOrder={getOrder}
      markAsDelivered={markAsDelivered}
      markAsPaid={markAsPaid}
    />
  );
}

export default AdminOrderDetailsScreen;
