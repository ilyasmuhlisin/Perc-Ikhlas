import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginScreen from "../screens/LoginScreen";

// admin form app route
function ProtectedRoutesComponent({ admin }) {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      return isAuth;
    });
  }, [isAuth]);

  if (isAuth === undefined) return <LoginScreen />;

  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );

  // simulasi
  // if (admin) {
  //   let adminAuth = true;
  //   // outlet halaman yang dilindungi
  //   return adminAuth ? <Outlet /> : <Navigate to="/login" />;
  // } else {
  //   let userAuth = true;
  //   // outlet halaman yang dilindungi
  //   return userAuth ? (
  //     <>
  //       <UserChatComponent />
  //       <Outlet />
  //     </>
  //   ) : (
  //     <Navigate to="/login" />
  //   );
  // }
}

export default ProtectedRoutesComponent;
