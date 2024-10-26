import baseApi from "../../api/baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "menu", 
    }),
  }),
  overrideExisting: false, 
});

export const { useGetMenuQuery } = menuApi;

export default menuApi;
