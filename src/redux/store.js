import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import menuApi from "./features/menu/menuApi";
import cartApi from "./features/cart/cartApi";
import wishlistApi from "./features/wishlist/wishlistApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      menuApi.middleware,
      wishlistApi.middleware
    ),
});

export default store;
