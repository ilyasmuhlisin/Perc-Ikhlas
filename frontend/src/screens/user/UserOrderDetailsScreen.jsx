import UserOrderDetailsScreenComponent from "./components/UserOrderDetailsScreenComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const UserOrderDetailsScreen = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  return (
    <UserOrderDetailsScreenComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
    />
  );
};

export default UserOrderDetailsScreen;
