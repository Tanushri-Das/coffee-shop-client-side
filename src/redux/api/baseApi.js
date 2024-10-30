import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/", // Base URL for all API requests
  }),
  endpoints: () => ({}), // This will be extended in menuApi.js
});

export default baseApi;
