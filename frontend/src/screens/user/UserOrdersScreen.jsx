import UserOrdersScreenComponent from "./components/UserOrdersScreenComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};

const UserOrdersScreen = () => {
  return <UserOrdersScreenComponent getOrders={getOrders} />;
};

export default UserOrdersScreen;
