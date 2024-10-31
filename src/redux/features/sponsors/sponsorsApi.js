import baseApi from "../../api/baseApi";

const sponsorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => "sponsors",
    }),
  }),
  overrideExisting: false,
});

export const { useGetSponsorsQuery } = sponsorsApi;

export default sponsorsApi;
