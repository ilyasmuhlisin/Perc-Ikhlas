import AnalyticsScreenComponent from "./components/AnalyticsScreenComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";
import TotalScreenComponent from "./components/TotalScreenComponent";
import SalesChartsComponent from "./components/SalesChartsComponent";
import ThisMonthComponent from "./components/ThisMonthComponent";

// import { useEffect, useState } from "react";

// import { logout } from "../../../redux/actions/userActions";
// import { useDispatch } from "react-redux";

const fetchOrdersForFirstDate = async (firstDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateToCompare
  );
  return data;
};

const fetchOrdersForSecondDate = async (secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare
  );
  return data;
};

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const AdminAnalyticsScreen = () => {
  // const dispatch = useDispatch();

  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   getOrders()
  //     .then((orders) => setOrders(orders))
  //     .catch(
  //       (er) => dispatch(logout())
  //       // console.log(
  //       //   er.response.data.message ? er.response.data.message : er.response.data
  //       // )
  //     );
  // }, []);
  const orders = [
    {
      _id: "64c121243265642c302b889d",
      createdAt: "2023-06-20T18:12:36.490+00:00",
      itemsCount: 3,
      cartSubtotal: 316,
      // Informasi order lainnya
    },
    {
      _id: "64c121243265642c302b889e",
      createdAt: "2023-07-10T14:25:19.732+00:00",
      itemsCount: 2,
      cartSubtotal: 220,
      // Informasi order lainnya
    },
    // Tambahkan data order lainnya sesuai kebutuhan
  ];

  // const groupOrdersByMonth = (orders) => {
  //   return orders.reduce((acc, order) => {
  //     const date = new Date(order.createdAt);
  //     const monthYear = `${date.getFullYear()}-${String(
  //       date.getMonth() + 1
  //     ).padStart(2, "0")}`;
  //     if (!acc[monthYear]) {
  //       acc[monthYear] = { monthYear, totalOrder: 1 };
  //     } else {
  //       acc[monthYear].totalOrder += 1;
  //     }
  //     return acc;
  //   }, {});
  // };

  // const ordersByMonth = Object.values(groupOrdersByMonth(orders));
  return (
    <>
      <AnalyticsScreenComponent
        fetchOrdersForFirstDate={fetchOrdersForFirstDate}
        fetchOrdersForSecondDate={fetchOrdersForSecondDate}
        socketIOClient={socketIOClient}
      />
      <TotalScreenComponent getOrders={getOrders} />
      <SalesChartsComponent getOrders={getOrders} />
      <ThisMonthComponent getOrders={getOrders} />
    </>
  );
};

export default AdminAnalyticsScreen;
