import OrdersScreenComponent from "./components/OrdersScreenComponent";

import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};
function AdminOrdersScreen() {
  return <OrdersScreenComponent getOrders={getOrders} />;
}

export default AdminOrdersScreen;
