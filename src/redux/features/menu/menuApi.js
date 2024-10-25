import baseApi from "../../api/baseApi";

// Define the menu API using the base API
const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "menu", // Endpoint for fetching menu items
    }),
  }),
  overrideExisting: false, // Optional: prevents overwriting existing endpoints
});

// Export the auto-generated hook for the `getMenu` query
export const { useGetMenuQuery } = menuApi;

// Export the menu API for use in the store
export default menuApi;
