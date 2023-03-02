import AnalyticsScreenComponent from "./components/AnalyticsScreenComponent";
import axios from "axios";

const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateToCompare,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare,
    {
      signal: abctrl.signal,
    }
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
