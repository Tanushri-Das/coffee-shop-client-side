import baseApi from "../../api/baseApi";

const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: () => "features",
    }),
  }),
  overrideExisting: false,
});

export const { useGetFeaturesQuery } = featuresApi;

export default featuresApi;
