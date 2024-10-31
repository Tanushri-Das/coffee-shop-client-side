import baseApi from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToContact: builder.mutation({
      query: (contactInfo) => ({
        url: "contacts",
        method: "POST",
        body: contactInfo,
      }),
    }),
  }),
});

export const { useAddToContactMutation } = contactApi;

export default contactApi;
