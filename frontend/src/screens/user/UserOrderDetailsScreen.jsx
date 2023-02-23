import UserOrderDetailsScreenComponent from "./components/UserOrderDetailsScreenComponent";
import { useSelector } from "react-redux";

const UserOrderDetailsScreen = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return <UserOrderDetailsScreenComponent userInfo={userInfo} />;
};

export default UserOrderDetailsScreen;
