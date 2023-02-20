import RegisterScreenComponent from "./components/RegisterScreenComponent";
import axios from "axios";

const registerUserApiRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });
  return data;
};

const RegisterScreen = () => {
  return (
    <RegisterScreenComponent registerUserApiRequest={registerUserApiRequest} />
  );
};

export default RegisterScreen;
