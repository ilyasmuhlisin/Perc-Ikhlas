import React from "react";
import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";

function RoutesWithUserChatComponent() {
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
}

export default RoutesWithUserChatComponent;
