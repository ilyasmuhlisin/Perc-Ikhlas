import LoginScreenComponent from "./components/LoginScreenComponent";
import axios from "axios";
const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  return data;
};

function LoginScreen() {
  return <LoginScreenComponent loginUserApiRequest={loginUserApiRequest} />;
}

export default LoginScreen;
