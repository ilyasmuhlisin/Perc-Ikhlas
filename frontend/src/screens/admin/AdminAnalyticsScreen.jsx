import AnalyticsScreenComponent from "./components/AnalyticsScreenComponent";
import axios from "axios";

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

const AdminAnalyticsScreen = () => {
  return (
    <AnalyticsScreenComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
    />
  );
};

export default AdminAnalyticsScreen;
