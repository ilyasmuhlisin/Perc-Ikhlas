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
  if (data.userLoggedIn.doNotLogout)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    // seassion auto login apabila borwser belum di keluarkan
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
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
