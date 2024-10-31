import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import menuApi from "./features/menu/menuApi";
import cartApi from "./features/cart/cartApi";
import wishlistApi from "./features/wishlist/wishlistApi";
import reviewsApi from "./features/reviews/reviewsApi";
import categoriesApi from "./features/categories/categoriesApi";
import featuresApi from "./features/features/featuresApi";
import themeReducer from "./features/theme/themeSlice";
import sponsorsApi from "./features/sponsors/sponsorsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [featuresApi.reducerPath]: featuresApi.reducer,
    [sponsorsApi.reducerPath]: sponsorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      menuApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      reviewsApi.middleware,
      categoriesApi.middleware,
      featuresApi.middleware,
      sponsorsApi.middleware
    ),
});

export default store;
