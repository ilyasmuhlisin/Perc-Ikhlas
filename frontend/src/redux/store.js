import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// validaasi  value
import thunk from "redux-thunk";

import { counterReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  cart: counterReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

// nilai awal
const INITIAL_STATE = {
  cart: {
    value: 0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
