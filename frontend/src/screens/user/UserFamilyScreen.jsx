import React from "react";
import UserFamilyScreenComponent from "./components/UserFamilyScreenComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const createUserFamilyApiRequest = async (userId, formInputs) => {
  const { data } = await axios.post(`/api/offline-orders/${userId}`, {
    ...formInputs,
  });
  return data;
};

const getOfflineOrdersDetails = async (id) => {
  const { data } = await axios.get(`/api/offline-orders/get-one/` + id);
  return data;
};

function UserFamilyScreen() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return (
    <UserFamilyScreenComponent
      createUserFamilyApiRequest={createUserFamilyApiRequest}
      userInfo={userInfo}
      getOfflineOrdersDetails={getOfflineOrdersDetails}
    />
  );
}

export default UserFamilyScreen;
