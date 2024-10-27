import baseApi from "../../api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (item) => ({
        url: "wishlists",
        method: "POST",
        body: item,
      }),
    }),
    getWishlistdataByEmail: builder.query({
      query: (email) => `/wishlists?email=${email}`,
    }),
    removeFromWishlist: builder.mutation({
      query: (itemId) => ({
        url: `wishlists/${itemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistdataByEmailQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;

export default wishlistApi;
