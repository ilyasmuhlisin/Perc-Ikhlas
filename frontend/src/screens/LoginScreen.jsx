import LoginScreenComponent from "./components/LoginScreenComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  return data;
};

function LoginScreen() {
  const reduxDispatch = useDispatch();

  return (
    <LoginScreenComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}

export default LoginScreen;
