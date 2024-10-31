import baseApi from "../../api/baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "reviews",
    }),
    addReview: builder.mutation({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;

export default reviewsApi;
