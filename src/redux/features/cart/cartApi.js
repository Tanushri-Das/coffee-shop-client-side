// src/redux/features/cart/cartApi.js
import baseApi from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (item) => ({
        url: 'cart', // Adjust this to your actual endpoint
        method: 'POST',
        body: item,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `cart/${itemId}`, // Adjust this to your actual endpoint
        method: 'DELETE',
      }),
    }),
    fetchCart: builder.query({
      query: () => 'cart', // Endpoint for fetching the cart items
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useFetchCartQuery,
} = cartApi;

export default cartApi;
