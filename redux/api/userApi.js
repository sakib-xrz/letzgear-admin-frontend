import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (query) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApi;
