import HomeScreenComponent from "./components/HomeScreenComponent";
import { useSelector } from "react-redux";

const HomeScreen = () => {
const { categories } = useSelector((state) => state.getCategories);

  return <HomeScreenComponent categories={categories} />;
};

export default HomeScreen;
