import UserProfileScreenComponent from "./components/UserProfileScreenComponent";
import axios from "axios";

const UserProfileScreen = () => {
  const updateUserApiRequest = async (
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password
  ) => {
    const { data } = await axios.put("/api/users/profile", {
      name,
      lastName,
      phoneNumber,
      address,
      country,
      zipCode,
      city,
      state,
      password,
    });
    return data;
  };

  return (
    <UserProfileScreenComponent updateUserApiRequest={updateUserApiRequest} />
  );
};

export default UserProfileScreen;
