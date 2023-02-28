import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductListScreen from "./screens/ProductListScreen";
import RegisterScreen from "./screens/RegisterScreen";
// user
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import UserCartDetailsScreen from "./screens/user/UserCartDetailsScreen";
import UserOrderDetailsScreen from "./screens/user/UserOrderDetailsScreen";
import UserOrdersScreen from "./screens/user/UserOrdersScreen";
import UserProfileScreen from "./screens/user/UserProfileScreen";
// admin
import AdminUsersScreen from "./screens/admin/AdminUsersScreen";
import AdminEditUserScreen from "./screens/admin/AdminEditUserScreen";
import AdminProductsScreen from "./screens/admin/AdminProductsScreen";
import AdminCreateProductScreen from "./screens/admin/AdminCreateProductScreen";
import AdminEditProductScreen from "./screens/admin/AdminEditProductScreen";
import AdminOrdersScreen from "./screens/admin/AdminOrdersScreen";
import AdminOrderDetailsScreen from "./screens/admin/AdminOrderDetailsScreen";
import AdminChatsScreen from "./screens/admin/AdminChatsScreen";
import AdminAnalyticsScreen from "./screens/admin/AdminAnalyticsScreen";
// component
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          {/* public */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product-list" element={<ProductListScreen />} />
          <Route
            path="/product-list/category/:categoryName"
            element={<ProductListScreen />}
          />
          {/* <Route path="/product-details" element={<ProductDetailsScreen />} /> */}
          <Route
            path="/product-details/:id"
            element={<ProductDetailsScreen />}
          />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element="Page not exist" />
        </Route>
        {/* user screen */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfileScreen />} />
          <Route path="/user/my-orders" element={<UserOrdersScreen />} />
          <Route
            path="/user/cart-details"
            element={<UserCartDetailsScreen />}
          />
          <Route
            path="/user/order-details/:id"
            element={<UserOrderDetailsScreen />}
          />
        </Route>

        {/* admin screen */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersScreen />} />
          <Route
            path="/admin/edit-user/:id"
            element={<AdminEditUserScreen />}
          />
          <Route path="/admin/products" element={<AdminProductsScreen />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductScreen />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminEditProductScreen />}
          />
          <Route path="/admin/orders" element={<AdminOrdersScreen />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailsScreen />}
          />
          <Route path="/admin/chats" element={<AdminChatsScreen />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsScreen />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
