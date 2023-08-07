import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import filterReducer from "./slice/filterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  orders: orderReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
