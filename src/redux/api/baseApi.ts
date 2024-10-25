import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api", // Base identifier for the API
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/", // Base URL for all API requests
  }),
  endpoints: () => ({}), // Empty initially, will be extended via injectEndpoints
});

export default baseApi;
