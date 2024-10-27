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
    updateCart: builder.mutation({
      query: ({ id, quantity, address, phone, countryCode }) => ({
        url: `carts/${id}`,
        method: "PATCH",
        body: { quantity, address, phone, countryCode },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartdataByEmailQuery,
  useUpdateCartMutation,
} = cartApi;

export default cartApi;
