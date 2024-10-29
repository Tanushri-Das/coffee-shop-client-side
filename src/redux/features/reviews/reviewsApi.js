import baseApi from "../../api/baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "reviews",
    }),
  }),
  overrideExisting: false,
});

export const { useGetReviewsQuery } = reviewsApi;

export default reviewsApi;
