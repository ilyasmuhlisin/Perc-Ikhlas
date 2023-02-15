import React from "react";
import UsersScreenComponent from "./components/UsersScreenComponent";

import axios from "axios";

const fetchUsers = async () => {
  // const users = await axios.get("/api/users");
  // hanya menampilkan property data
  const { data } = await axios.get("/api/users");
  return data;
};

function AdminUsersScreen() {
  return <UsersScreenComponent fetchUsers={fetchUsers} />;
}

export default AdminUsersScreen;
