import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesComponent({ admin }) {
  let auth = false;
  if (admin) {
    let adminAuth = true;
    if (adminAuth) auth = true;
  }else{
    let userAuth = true;
    if (userAuth) auth = true;
  }
  // outlet halaman yang dilindungi
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutesComponent;
