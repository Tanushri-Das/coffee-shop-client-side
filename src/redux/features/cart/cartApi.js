import baseApi from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (item) => ({
        url: "carts",
        method: "POST",
        body: item,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `carts/${itemId}`,
        method: "DELETE",
      }),
    }),
    getCartdataByEmail: builder.query({
      query: (email) => `/carts?email=${email}`,
    }),
    updateCartQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `carts/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartdataByEmailQuery,
  useUpdateCartQuantityMutation,
} = cartApi;

export default cartApi;
