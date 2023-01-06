import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

function ProtectedRoutesComponent({ admin }) {
  if (admin) {
    let adminAuth = true;
    // outlet halaman yang dilindungi
    return adminAuth ? <Outlet /> : <Navigate to="/login" />;
  } else {
    let userAuth = true;
    // outlet halaman yang dilindungi
    return userAuth ? (
      <>
        <UserChatComponent />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  }
}

export default ProtectedRoutesComponent;
