import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
