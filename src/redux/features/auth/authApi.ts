// import baseApi from "../../api/baseApi";

// const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     saveUser: builder.mutation({
//       query: (userInfo) => ({
//         url: "/users",
//         method: "POST",
//         body: userInfo,
//       }),
//     }),
//   }),
// });

// export const { useSaveUserMutation } = authApi;


import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUserByEmail: builder.query({
        query: (email) => `/users?email=${email}`,
      }),
  }),
});

export const { useSaveUserMutation ,useGetUserByEmailQuery} = authApi;