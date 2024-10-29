import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import menuApi from "./features/menu/menuApi";
import cartApi from "./features/cart/cartApi";
import wishlistApi from "./features/wishlist/wishlistApi";
import reviewsApi from "./features/reviews/reviewsApi";
import categoriesApi from "./features/categories/categoriesApi";
import featuresApi from "./features/features/featuresApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [featuresApi.reducerPath]: featuresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      menuApi.middleware,
      wishlistApi.middleware,
      reviewsApi.middleware,
      categoriesApi.middleware,
      featuresApi.middleware,
    ),
});

export default store;
