import OrderDetailsScreenComponent from "./components/OrderDetailsScreenComponent";

import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id);
  return data;
};
function AdminOrderDetailsScreen() {
  return <OrderDetailsScreenComponent getOrder={getOrder} />;
}

export default AdminOrderDetailsScreen;
